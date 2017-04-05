//safe code . new execution context
;(function(global, $){
    
    //'new' an obj
   var Greeter = function(firstname, lastname, language){
       return new Greeter.init(firstname, lastname, language);
   } 
   
   //hidden within the scope of the IIFE and never directyly
   var supportedLanguags=['en','es'];
    
    //informal greeting
   var greeting = {
        en: 'Hello',
        es: 'Hola'
    };
    
    //formal greeting
    var formalGreetings ={
        en: 'Greetings',
        es: 'Saludos'
    };
    
    //loger messages
    var logMessages ={
        en: 'Logged in',
        es: 'inicio session'
    };

    //prototype holds method (to save memory)
    Greeter.prototype={
        
        //'this' refers to the calling obj at execution time
       fullname: function(){
           return this.firstname+' '+this.lastname;
       },
        
       validate: function(){
          //check that is a valid lang
           //refernces the externally inaccessible "supported Lang" in clousure
           if(supportedLanguags.indexOf(this.language)===-1){
               throw 'Invalid Language';
           }
       },
       
        //retrieve msg from obj by refering to properties using [] syntax
       greetings: function(){
           return greeting[this.language]+' '+this.firstname+'!';
       },
        
       formalGreeting: function(){
            return formalGreetings[this.language]+','+this.fullname();
       },
        
        //chainable methods return their own containing obj
       greet: function(formal){
           var msg;
           //if undefined/null= false
           if(formal){
               msg = this.formalGreeting();
               console.log("The massege "+msg);
           }
           else{
               msg = this.greetings();
           }
           if(console){
               console.log(msg);
           }
           //"this" refers to the calling obj at execution time 
           return this; //make it chainable
       },
        
       log: function(){
           if(console){
               console.log(logMessages[this.language]+": "+this.fullname());
           }
           //make it chainable
           return this;
       },
        
       setLang: function(lang){
           this.language = lang;
           this.validate();
           //make it chainable
           return this;
       },
        
       HTMLGreetings: function(selector, formal){
           
       if(!$){
            throw "JQuery not loaded";
       }
       if(!selector){
           throw 'missing jQuery selector';
       }
        //determine the message
       var msg;
       if(formal){
           msg=this.formalGreeting();
        }else{
            msg=this.greeting();
        }
          //inject the message in the chosen place in the DOM 
        $(selector).html(msg);
        return this;//make it chainable
       } 
   };
   
    //the actual obj is created here, allowing us to 'new' an obj without calling 'new' 
   Greeter.init = function(firstname, lastname, language){
       
        var self = this;
        self.firstname = firstname|| '';
        self.lastname  = lastname || '';
        self.language  = language ||'en'; 
       
        self.validate();
   }
   //trick borriwed form jQuery so we dont have to use the 'new' keyword
   Greeter.init.prototype = Greeter.prototype;
    // attach our greeter to the global obj, and provide a shortend 'G$' for ease
   global.Greeter = global.G$ = Greeter;
    
}(window, $));