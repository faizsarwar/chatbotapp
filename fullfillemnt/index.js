const {Suggestions} = require('actions-on-google');
const {Suggestion} = require("dialogflow-fulfillment");
const {WebhookClient}=require("dialogflow-fulfillment");
const { request, response } = require("express");
const express=require("express");
const app=express();


//database connection

var admin = require("firebase-admin");

var serviceAccount = require("./config/groomingbot-d6ea6-firebase-adminsdk-i9qcr-b2df1cc3e6.json");

try{
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: "https://groomingbot-d6ea6-default-rtdb.firebaseio.com/"
      });
            
}
catch{
    console.log("database disconnected")




// dialogflow app pr post ki request bhejegaa

app.get("/",(req,res)=>{
    res.sendFile('index.html',{root:__dirname});
})


app.post("/webhook",express.json(),(request,response)=>{          //fulfillment mai bhi url mai /webhook lagana huga 
    const agent=new WebhookClient({request:request,response:response});
        
    function fallback(agent){
        agent.add("please choose below services \n haircut , bathe, boarding, dog training, health"); //
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


    function getfromfirebase(agent){  //added
        return admin.database().ref("address").once("value").then((snapshot)=>{
            var address=snapshot.val();
            agent.add("hey the addess is "+ address)
        })
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

        return admin.database().ref("/users").push({
            "service":"premium package",
            "breed":breed,
            "height":height,
            "phone number":phone_number,
            "age":age
        }).then((snapshot)=>{
            console.log("sucessfuly write into db"+snapshot.ref.toString());
            agent.add("your query is registered you will recive sms shortly on ",phone_number);

        }).catch();

       
    }

    function basic(agent){
        // let user_name= agent.parameters["person"].name;       // is ka mtlb person ka peremeter fetch huga consoe ki trha yhn pr  // object hai isko convert krna parayga (.name  laga kr)
        let breed=agent.parameters["any"];
        let height=agent.parameters["unit-length"];  
        let phone_number=agent.parameters["phone-number"];
        // console.log(typeof(height),height)
        console.log("Package is   Basic","\n" + "breed is   "+breed,"\n" + "Phone number is    "+phone_number+"\n","hieght is    ",height)          


        return admin.database().ref("/users").push({
            "service":"basic package",
            "breed":breed,
            "height":height,
            "phone number":phone_number,
            "age":age
        }).then((snapshot)=>{
            console.log("sucessfuly write into db"+snapshot.ref.toString());
            agent.add("your query is registered you will recive sms shortly on ",phone_number);

        }).catch();  
    }


    function health(agent){
        // let user_name= agent.parameters["person"].name;       // is ka mtlb person ka peremeter fetch huga consoe ki trha yhn pr  // object hai isko convert krna parayga (.name  laga kr)
        let breed=agent.parameters["any"];
        let height=agent.parameters["unit-length"];  
        let phone_number=agent.parameters["phone-number"];
        // console.log(typeof(height),height)
        console.log("Package is   Basic","\n" + "breed is   "+breed,"\n" + "Phone number is    "+phone_number+"\n","hieght is    ",height)          


        return admin.database().ref("/users").push({
            "service":"health",
            "breed":breed,
            "height":height,
            "phone number":phone_number,
            "age":age
        }).then((snapshot)=>{
            console.log("sucessfuly write into db"+snapshot.ref.toString());
            agent.add("your query is registered you will recive sms shortly on ",phone_number);

        }).catch();  
    }


    function haircut(agent){
        // let user_name= agent.parameters["person"].name;       // is ka mtlb person ka peremeter fetch huga consoe ki trha yhn pr  // object hai isko convert krna parayga (.name  laga kr)
        let breed=agent.parameters["any"];
        let height=agent.parameters["unit-length"];  
        let phone_number=agent.parameters["phone-number"];
        // console.log(typeof(height),height)
        console.log("Package is   Basic","\n" + "breed is   "+breed,"\n" + "Phone number is    "+phone_number+"\n","hieght is    ",height)          


        return admin.database().ref("/users").push({
            "service":"haircut",
            "breed":breed,
            "height":height,
            "phone number":phone_number,
            "age":age
        }).then((snapshot)=>{
            console.log("sucessfuly write into db"+snapshot.ref.toString());
            agent.add("your query is registered you will recive sms shortly on ",phone_number);

        }).catch();  
    }


    function boarding(agent){
        // let user_name= agent.parameters["person"].name;       // is ka mtlb person ka peremeter fetch huga consoe ki trha yhn pr  // object hai isko convert krna parayga (.name  laga kr)
        let breed=agent.parameters["any"];
        let height=agent.parameters["unit-length"];  
        let phone_number=agent.parameters["phone-number"];
        // console.log(typeof(height),height)
        console.log("Package is   Basic","\n" + "breed is   "+breed,"\n" + "Phone number is    "+phone_number+"\n","hieght is    ",height)          

        return admin.database().ref("/users").push({
            "boarding":"boarding",
            "breed":breed,
            "height":height,
            "phone number":phone_number,
            "age":age
        }).then((snapshot)=>{
            console.log("sucessfuly write into db"+snapshot.ref.toString());
            agent.add("your query is registered you will recive sms shortly on ",phone_number);

        }).catch();  
    }


    function training(agent){
        // let user_name= agent.parameters["person"].name;       // is ka mtlb person ka peremeter fetch huga consoe ki trha yhn pr  // object hai isko convert krna parayga (.name  laga kr)
        let breed=agent.parameters["any"];
        let height=agent.parameters["unit-length"];  
        let phone_number=agent.parameters["phone-number"];
        // console.log(typeof(height),height)
        console.log("Package is   Basic","\n" + "breed is   "+breed,"\n" + "Phone number is    "+phone_number+"\n","hieght is    ",height)          


        return admin.database().ref("/users").push({
            "service":"training",
            "breed":breed,
            "height":height,
            "phone number":phone_number,
            "age":age
        }).then((snapshot)=>{
            console.log("sucessfuly write into db"+snapshot.ref.toString());
            agent.add("your query is registered you will recive sms shortly on ",phone_number);

        }).catch();  
    }

    let intentMap= new Map();
    intentMap.set("Default Fallback Intent",fallback);    //ju name intent ka dailog flow ai huga whi dena hai ,ju function call krwana hai wo
    intentMap.set("welcome",welcome);
    intentMap.set("bathe",bathe);
    intentMap.set("premium-package",premium);
    intentMap.set("basic package",basic);
    intentMap.set("getadress",getfromfirebase);  //added
    intentMap.set("health",health);
    intentMap.set("hair-cut",haircut);
    intentMap.set("boarding",boarding);
    intentMap.set("dog-training",training);
    agent.handleRequest(intentMap)
})

const port = process.env.PORT || 4000
app.listen(port,()=>{
    console.log("server is up on 4000")
})