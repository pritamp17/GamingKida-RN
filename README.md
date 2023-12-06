-- > real time chat -> firebase 

-- >  

  

  

- async storage 

   -> user -> session info 

                ->  chat id's in which user have participted 

   ->  

  

-> firebase  

  -> store chat based on chatId 

->  

->  

  

  

-> fetch chats ----> 

-> fetch user 

-> payements  

  

  

user ->  

      - Object name Info 

      - Email 

      - userId 

      - groupId [ ]          

      - competitionId [] 

  

----> chat 

              ->   

  

UserService 

   -> create user 

  

  

  

  

--------> 

  

user  -> group -> chats -> [ chatId ] 

      | > one to one chats -> [ chatId ] 

  

  

  - Object UserInfo  {{ 

  idToken: string, 

  serverAuthCode: string, 

  scopes: Array<string> 

  user: { 

    email: string, 

    id: string, 

    givenName: string, 

    familyName: string, 

    photo: string, // url 

    name: string // full name 

  } 

}} 

  

  

user ->  

      - name  

      - email 

      - groupId [ ]          

      - competitionId [] 

      - connectionId [] 
      - 

  

Login -> Get userObj -> store in Async Storage  

next login -> if user present in async storage continue else -> Login 

  

Navigation 

-> login -> [ profile     HomeScreen        Orgs ] 

                        |                  |                        | 

                screen          Live Posts             [ Active Orgs, Upcoming comp, most rated ] 

                        | 

                 [ Orgs joined, 

                  connections, 

                  Posts ] 

  

  

-> Implement navigation from user enters app to  - done 

  

-> orgs screen 

  

  ->   

        ->  search orgs [search bar] 

        -> upcoming comps 

        ->  

  

-> implement navigation screen   /////////// to do 

  

user ->  

      - Object name Info 

      - Email 

      - userId 

      - orgId [ ]          

      - competitionId [] 

  

  

///////////////////////////////////// 

************  org service 

  

              ->created 

              |                                                     -> superAdmin 

--org   --|                            ---> members  -> admin 

               |                                                    -> member 

               -> joined 

  

org 

-> name ----------> unique 

-> Id ---------------------> unique 

-> createdAt 

-> AdminId's -> [] 

-> memberId's -> [...userId's] 

-> compId's-> [] -------------------------------->Schema {} -----------> - Id 

                                                                                                                  - createAt 

                                                                                                                  - orgId 

                                                                                                                   - scheduledAt 

  

  

------>  createOrg 

------> search Org  --> by name 

-------> delete org [only performed by admins of that org]          

-------> Edit org [rename, remove members, create competi, add admins]  

              -> remove members 

                                                                                                                  

  

//////////////////////  tournament service
   MAX =100  

  

             members.size < max 

                   ^                                                                                                                       MAX-1 
                    |                                                                                                                          ^ 

                    |                                                                                                  unpaid              | 

                  req                                                     |------ REJECT                       |---------- > done           |---> FAILED ---> END 

member  ---------> compe -----> ADMIN ------|                                            |    PAID                           | 

                                                                             |------ Accept ---------------|----------> PAYMENT ---- 

                                                                                                                                                                 | 

                                                                                                                                                                 |----> SUCCESS   ---- > MAX - 1 ---> END 

  
----> create a competetion  
----> send request to join

tournament    -> individual    ----      
                       -> org              ---- by admins 
                              

                         Schema ->  

                                    - orgId  --- userId if created by individual  user
                                    - Name    ---
                                    - Game    --- 
                                    - image  ---
                                    - description  ---
                                    - createdBy  --- Admin && superAdmin only ---
                                    - createdAt --
                                    - Scheduled at --  
                                    - paid - > bool  -> if yes then price  -------------- if paid---> payment Service ----> ? 
                                    - members []   ----> if paid ?? 
                                    - allowed members --> all or only of org 
                                    - orgId  -> for indivi -> userId 

                        

  

--> create compet from org [by admins and superAdmins] 

--> create compe by individual 

  

  

  

/////////////////  org -> public or private ? 

  

--> member       --------->      Payment       ----------->          competition 

                           |                                                                                ^ 

                           | -------------------------------------------------------| 

                                                   unpaid 

  

  

///////////////////   Linking payments to tournament ? 

                                         

                            ---> verify payement succefull then ...memberid,userId ? 

                                

                                       

  
                                                                                                           

                                                                                                         |-----> superAdmin  ------- |
                                                                                                         |                                           |------->   competition            
                                                                                                         |----->  Admins       -------  |                  ^    
SuperAdmin  ----->       org  --->                     -> members  ------|                                                               |
                                                                                                         |-----> Members     ----------------------|
                                                                         

    

         

  MAX = 100 + Admins


    members.size < MAX 

                   ^                                                                                                                       MAX-1 
                    |                                                                                                                          ^ 
                    |                                                                                                                           |
                    |                                                                                                  unpaid              | 

                  req                                                     |------ REJECT                       |---------- > done           |---> FAILED ---> END 

member  ---------> compe -----> ADMIN ------|                                            |                                      | 
                                                                                                                               PAID
                                                                             |------ Accept ---------------|----------> PAYMENT ---- 

                                                                                                                                                                 | 

                                                                                                                                                                 |----> SUCCESS   ---- > MAX - 1 ---> END 


  

  
----> create a competetion  
----> send request to join
--->  

tournament    -> individual    ----      
                       -> org              ---- by admins 
                              
      Members -> comp -> Req -> 

                         Schema ->  

                                    -string orgId  --- userId if created by individual  user
                                    -string Name    ---
                                    -string description
                                    -string Game    --- 
                                    - image  ---
                                    -string description  ---
                                    -string createdBy  --- Admin && superAdmin only ---
                                    -date createdAt --
                                    -date Scheduled at --  
                                    -bool paid - > bool  -> if yes then price  -------------- if paid---> payment Service ----> ? 
                                    -string fee 
                                    - members []   ----> if paid ?? 
                                    -string public or private
                                    - requests []
                                  

                        
------------- what to do ????? tournament completed ?? schema change
  + schema               
                                    - status
                                    - winnersId
  

--> create compet from org [by admins and superAdmins]  --done
--> create compe by individual  -- done
--> send request to join competition -- org members ? non org members ? --- 
--> expire competition after 24 hrs ---

  
------------------???? privateOrPublic on sendRequest or AcceptRequest
  

/////////////////  org -> public or private ? 

  

  

  

  




--- chats -> chatId -> messages   - 
                                                      -        
                                                      -

  
--- org -> orrgId

--- tournament ->   

  

  

  members.size < MAX 

                   ^                                                                                                                       MAX-1 
                    |                                                                                                                          ^ 
                    |                                                                                                                           |
                    |                                                                                                  unpaid              | 

                  req                                                     |------ REJECT                       |---------- > done           |---> FAILED ---> END 

member  ---------> compe -----> ADMIN ------|                                            |                                      | 
                                                                                                                               PAID
                                                                             |------ Accept ---------------|----------> PAYMENT ---- 
                                                                                                                                              |
                                                                                                                                              |                  | 
                                                                                                                                              |                  |
                                                                                                                                                                 |----> SUCCESS   ---- > MAX - 1 ---> END 

  

-------> Posts ?
-------> org or public ?


  

  
-- payments -> 
         ---> id
        ----> userId
        -----> Name
        -----> Success Bool
         ----> transactionId             ??? how to track payments and verify it??  ---> store payment info in async storage instead and just store tranxid and date in firebase
         ----> amount
        -----> verified ?
        ------> Type 



members.size < MAX 

                   ^                                                                                                                       MAX-1 
                    |                                                                                                                          ^ 
                    |                                                                                                                           |
                    |                                                                                                  unpaid              | 

                  req                                                     |------ REJECT                       |---------- > done           |---> FAILED ---> END 

member  ---------> compe -----> ADMIN ------|                                            |                                      | 
                                                                                                                               PAID
                                                                             |------ Accept ---------------|----------> PAYMENT ---- 
                                                                                                      |                                        |
                                                                                                      |                                        |                  | 
                                                                                                      |                                        |                  |
                                                                                                      |                                                           |----> SUCCESS   ---- > MAX - 1 ---> END  --- ID   
                                                                                   [handle concurrent request]


  

                                                 |-------->Reject
paid --                                       | member.size > MAX
              member ----> Req ---|                                                                         |---->  FAILED
                                                 |                                                                          |
                                                 |----------> Accept ---------> PayRequest -----|
                                                                                                                            |
                                                                                                                            |-----> SUCCESS ---> MAX-1
  

  

     Paid competetion                
/// create
// send Request
                 --- only send when PayReq < 100
// Admins will accept requests
// 
 





                             |---------> failed
payments --------|                                              
                             |                                              
                             |---------> SUCCESS ----------> Verify ??










// accept request , add in member id add only payReqq < MAX




-----> payservice    
                  ----> generate trnxId ---> store that in paidTOurnament trnaxid's - if payment is done check it with tournamntId while joining









TrannxId Generated ( save to tournamnet)
     |
     |                                                                    -------> failed
     |                                                                    |
payment -----------> Async storage --------> |
                                                                         |----------------> SUCCESS --------> verify from async storage and tornament tranxId
//////////////////////////

tournament End ?
Pay after end ?
winners after end ?
verify winners ?????
change tournament schema ?

///////////////////////////////////////////////////////

////////////////////////////////////////////

posts ???

if i post in group ?? 
user posts ?? schema, visiblity


////////////////////////////////

prize service 


schema           schema           schema                ??
user ----------> org  -------> compete ------> prize



///// prize service 

userId
orgId
competeId ? 
type
amount
iscompleted
date: 
trascationId





AdminUser || orgId -------> competeId -------> prize


// active after competetion complete
// confirm from admin and get winners userId
// make prize payment

/////// ?? how to poll in running tournmanet
//////// how to verify winner ??



//// comp start >>
- info of comp
- running status of comp
- prize
- comp end
- comp history


/

 
16Prp17@ EWA


///////////// connections ////////////////
user -> conection 
        -> competetionId --> prize
        -> orgIdS




////////////////////// DB schema

payment -> tournament -> id
tournament -> paid -> id
           -> unpaid -> id

///////////////

prize 
-> admin will select winner
-> winner will uplaod ss {i am uing ocr using gpt4 }
-> create one more db with userId and gaming user name from ocr result i am going to verify gaming user name and date and name
