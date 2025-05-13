# GoGroceries

A MVP product for delivering daily grocerie requirement to the users at their door step.

## Here is steps to run this repo

<ol>
  <li> Clone this repo </li>
  
   ```bash
   git clone https://github.com/Harbinder04/GoGroceries.git
   ```
   <li>
    Copy all "example.env" files to ".env"
   </li>

  ### You can get postgres database from [https://neon.tech/](https://neon.tech/)
  > **_NOTE:_** Currently no seeding of database is avilable, you need to add data manually.  
  
   <li>
   Install packages and generate the database
   </li>
   
     yarn install
     yarn db:generate

   <li>
   Copy docker file to the root directory
     
   ```bash
   cp ./docker/DockerfileuserApp Dockerfile
   ```
   </li>

</ol>
