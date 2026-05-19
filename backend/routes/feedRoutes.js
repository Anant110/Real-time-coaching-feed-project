import express from 'express'
import { getFeeds,createFeed,setSocketInstance } from '../controllers/feedController.js'

const FeedRouter=express.Router()
FeedRouter.get('/gfeed',getFeeds)
FeedRouter.post('/cfeed',createFeed)

export default FeedRouter