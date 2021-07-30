const {Suggestions} = require('actions-on-google');
const {Suggestion} = require("dialogflow-fulfillment");
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
        agent.add("please choose below services"); //
        agent.add(new Suggestion("haircut"))  //
        agent.add(new Suggestion("bathe"))  //
        agent.add(new Suggestion("boarding"))  //
        agent.add(new Suggestion("dog training"))  //
        agent.add(new Suggestion("health"))  //
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

            agent.add(new Suggestion("haircut"))  //
            agent.add(new Suggestion("bathe"))  //
            agent.add(new Suggestion("boarding"))  //
            agent.add(new Suggestion("dog training"))  //
            agent.add(new Suggestion("health"))  //
    
    }

  
    function bathe(agent){  //
        agent.add("we have two packages basic or premium with dog spa and herbs. what do you like ?")  //
        agent.add(new Suggestion("premium"))  //
        agent.add(new Suggestion("basic"))   //

    }


    function premium(agent){
        // let user_name= agent.parameters["person"].name;       // is ka mtlb person ka peremeter fetch huga consoe ki trha yhn pr  // object hai isko convert krna parayga (.name  laga kr)
        let breed=agent.parameters["any"];
        let height=agent.parameters["unit-length"];  
        let phone_number=agent.parameters["phone-number"];
        // console.log(typeof(height),height)
        console.log("Package is   Premium","\n" + "breed is   "+breed,"\n" + "Phone number is    "+phone_number+"\n","hieght is    ",height)          


        agent.add("your query is registered you will recive sms shortly on ",phone_number);
     
    }

    function basic(agent){
        // let user_name= agent.parameters["person"].name;       // is ka mtlb person ka peremeter fetch huga consoe ki trha yhn pr  // object hai isko convert krna parayga (.name  laga kr)
        let breed=agent.parameters["any"];
        let height=agent.parameters["unit-length"];  
        let phone_number=agent.parameters["phone-number"];
        // console.log(typeof(height),height)
        console.log("Package is   Basic","\n" + "breed is   "+breed,"\n" + "Phone number is    "+phone_number+"\n","hieght is    ",height)          


        agent.add("your query is registered you will recive sms shortly on ",phone_number);
     
    }

    let intentMap= new Map();
    intentMap.set("Default Fallback Intent",fallback);    //ju name intent ka dailog flow ai huga whi dena hai ,ju function call krwana hai wo
    intentMap.set("welcome",welcome);
    intentMap.set("bathe",bathe);
    intentMap.set("premium",premium);
    intentMap.set("basic",basic);
      agent.handleRequest(intentMap)
})

const port = process.env.PORT || 4000
app.listen(port,()=>{
    console.log("server is up on 4000")
})