const {WebhookClient}=require("dialogflow-fulfillment");
const { request, response } = require("express");
const express=require("express");
const app=express();




// dialogflow app pr post ki request bhejegaa

app.get("/",(req,res)=>{
    res.sendFile('index.html',{root:__dirname});
})


app.post("/webhook",express.json(),(request,response)=>{          //fulfillment mai bhi url mai /webhook lagana huga 
    const agent=new WebhookClient({request:request,response:response});
    
    function fallback(agent){
        agent.add("your bot does not understand this");
    }

    function welcome(agent){
        agent.add("Hello . I am a chatbot from Dog gromming services . We offer dog hair cut, dog grooming, dog spa ,dog bathe ,dog health , dog boarding and dog behavioral training");
    }

    function bathe(agent){
        // let user_name= agent.parameters["person"].name;       // is ka mtlb person ka peremeter fetch huga consoe ki trha yhn pr  // object hai isko convert krna parayga (.name  laga kr)
        let package=agent.parameters["bathe"];
        let breed=agent.parameters["any"];
        let height=agent.parameters["unit-length"];  
        let phone_number=agent.parameters["phone-number"];
        console.log(typeof(height),height)
        console.log("Package is   "+package,"\n" + "breed is   "+breed,"\n" + "Phone number is    "+phone_number+"\n","hieght is    ",height)          

        agent.add("your query is registered you will recive sms shortly on ",phone_number);
     
    }

    let intentMap= new Map();
    intentMap.set("Default Fallback Intent",fallback);    //ju name intent ka dailog flow ai huga whi dena hai ,ju function call krwana hai wo
    intentMap.set("welcome",welcome);
    intentMap.set("bathe",bathe);
    agent.handleRequest(intentMap)
})

const port = process.env.PORT || 4000
app.listen(port,()=>{
    console.log("server is up on 4000")
})