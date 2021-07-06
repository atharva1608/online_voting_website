const express = require('express')
const router = express.Router()
const userTemplate = require('../Models/UserModel')
const voteTemplate = require('../Models/VoteModel')
require('dotenv').config(); 
const dotenv = require('dotenv')
const client = require('twilio')(process.env.ACCOUNT_SID, process.env.AUTH_TOKEN)

router.post('/voter',async(request,response) =>{
    const { fullname,aadharcardno,voterid,mobilenumber } = request.body
	const voterfullname = await userTemplate.findOne({ fullname }).lean()
    const voteraadharcardno = await userTemplate.findOne({ aadharcardno }).lean()
    const voteridno = await userTemplate.findOne({ voterid }).lean()
    const votermobilenumber = await userTemplate.findOne({ mobilenumber }).lean()

	if (!voterfullname) {
     response.json({ status: 'error', error: 'Voter not found!!! Please enter correct name as per Aadhar Card to vote' })
    }
    if (!voteraadharcardno) {
        response.json({ status: 'error', error: 'Voter not found!!! Please enter correct aadhar card number to vote' })
    }
    if (!voteridno) {
        response.json({ status: 'error', error: 'Voter not found!!! Please enter correct voter id number to vote' })
    }
    if (!votermobilenumber) {
        response.json({ status: 'error', error: 'Voter not found!!! Please enter correct mobile number to vote' })
        
    }
    if (voterfullname && voteraadharcardno && voteridno && votermobilenumber) {
        client
        .verify
        .services(process.env.SERVICE_ID)
        .verifications
        .create({
            to: `+91${request.body.mobilenumber}`,
            channel: 'sms'
        })
        .then(data => {
            response.status(200).send({
                message: "Verification is sent!!",
                phonenumber: votermobilenumber,
                data
            })
        }) 
     } else {
        response.status(400).send({
            message: "Wrong phone number :(",
            phonenumber: votermobilenumber,
            
        })
     }
    response.send(voterfullname)
    console.log(voterfullname)
    console.log("Success")
});

router.post('/verify', (req, res) => {
    const {mobilenumber,otp } = req.body
    
    if (mobilenumber && otp.length === 6) {
        client
            .verify
            .services(process.env.SERVICE_ID)
            .verificationChecks
            .create({
                to: `+91${mobilenumber}`,
                code: otp
            })
            .then(data => {
                if (data.status === "approved") {
                    res.status(200).send({
                        message: "User is Verified!!",
                        data
                    })
                }
            })
    } else {
        res.status(400).send({
            message: "Wrong phone number or code :(",
            phonenumber:mobilenumber,
            
        })
    }
})

router.post('/vote',async(request,response)=>{
    
    const newVote = new voteTemplate({
        vote: request.body.candidatename,
       })
    const result = await newVote.save()
    response.send(result)
    console.log(voteTemplate.find({vote:"Candidate A"}).count())
    console.log(voteTemplate.find({vote:"Candidate B"}).count())
    console.log(voteTemplate.find({vote:"Candidate C"}).count())
    console.log(voteTemplate.find({vote:"Candidate D"}).count())
    console.log(voteTemplate.find({vote:"None of the Above "}).count())
})




module.exports = router