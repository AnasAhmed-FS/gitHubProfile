//API callink 
const apiLink= "https://api.github.com/users/";
var personInfoL = document.getElementById('leftSide');
var personInfoR = document.getElementById('rightSide');
var follwoers = document.getElementById('follwoers');
var follwoing = document.getElementById('follwoing');
const reposEl = document.getElementById("repos"); // Send result to Html 
 
 userInfo("AnasAhmed-FS");

        // Insert user login
    async function userInfo(userLogin){ 
        const userAttr = await fetch( apiLink + userLogin);
        if(userLogin.match(userAttr)){
            const responseJson =  await userAttr.json();
            //console.log(responseJson);
             createUserAttr(responseJson);
            repos(userLogin);
        }else{
            alert('GitHub does not have this user login ')
            userInfo("AnasAhmed-FS");
        }
      
 
    } 

    // Return user name and bio and followers and so on...
    function createUserAttr(userLogin){
        const depL =`                   
                    <img class="avatar col-4"   src='${userLogin.avatar_url}' alt='${userLogin.login}'>
                    <div class='w-100'></div>
                    <h3 class="">
                        ${userLogin.name?userLogin.name:userLogin.login}
                    </h3>
                    <div class='w-100'></div>
                    <h6 class="">
                    ${userLogin.bio?userLogin.bio:"He does not have BIO"}
                    </h6>
      
            
        `
        personInfoL.innerHTML = depL;
        follwoers.innerHTML = ` ${userLogin.followers}FOLLWOERS`;
        follwoing.innerHTML = `${userLogin.following}FOLLWING`;
             

    }
    //  Repositories 
    async function repos(reposUser){
        // check about user name is matching with github to get right reponse or know 
        const userAttrRepos =  await fetch( apiLink + reposUser +'/repos' ) ;
        // receive VALUES in json format and using then() if the response is successfully, we will run  for loop to return our needs 
        await userAttrRepos.json()
        .then(function(res){
                // return name value with link and determined the target
                 console.log(res) 
                reposEl.innerHTML='';
                var  reposName, reposLink, eleA ;  
            for(var i of res){               
                // return Repositories name and link 
                 reposName= i.name;
                 reposLink= i.html_url;
                 // Establish anchor html tag to each result in loop 
                   eleA = document.createElement("a");
                 // add same class name to each anchor will create (this instruction will help modify style css)
                eleA.classList.add('reposStyle'); // CSS class
                eleA.classList.add('m-1');
                eleA.classList.add('col-md-5'); // BootStrap class about grid system
                eleA.href = reposLink;
                eleA.target = "_blank";
                eleA.innerText = reposName;
                // Appear result in html  
                reposEl.appendChild(eleA); 
            }     
        });
    } 
        // Search input about user 
    var btn_sh = document.getElementById("btn_sh")
    btn_sh.addEventListener('click',(e)=>{ 
            e.preventDefault();
            var valueIns= document.getElementById('search'); 
            // create validation
            
            if(valueIns.value){
            userInfo(valueIns.value.trim());                
            valueIns.value=''
            }
        })
  