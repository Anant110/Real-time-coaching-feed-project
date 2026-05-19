import { createClient } from 'redis';

let Reddisclient

const connectRedis=async()=>{
    try {
        Reddisclient = createClient({
       url: process.env.REDIS_URL
});

    await Reddisclient.connect();

    console.log("Reddis connected")
        
    } catch (error) {
        console.log(error)
    }
}

export {Reddisclient}
export default connectRedis
