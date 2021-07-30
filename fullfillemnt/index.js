const { Suggestions } = require("actions-on-google");
const {WebhookClient, Suggestion}=require("dialogflow-fulfillment");
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
        agent.add(new Suggestions(["haircut"]))
    }

    function welcome(agent){
        agent.add(`We provide a variety of services
            Dog grooming, dog spa, dog behavioural training
            
            Dog grooming: full shave or customised? Please provide details.
            
            Dog spa: basic spa where doggy is immersed in beneficial herbs
            Premium spa where doggy massage is given  to aid in blood circulation and muscle relaxation
            
            Dog behavioural training : train in peeing on pee pad or pee tray 
            Train to behave in public
            Train to walk without leash`);
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