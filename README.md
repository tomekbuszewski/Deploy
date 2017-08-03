# Deploy script

Script creates new directory, makes git clone from your repo (from `master` branch) and send the resulting build to your server.

Deploy connects with your SFTP account. In order for this script to work you need to have ssh keys paired.

## Installation
Create `.deploy` file and place inside there following data in JSON format:
```javascript
{
  "public": "path/to/your/directory",
  "user": "username",
  "host": "yourhost.com",
  "command": "for example: yarn install"
}
``` 

I believe these fields are pretty self-explanatory. The `command` is crucial here since you are telling the script what it needs to execute when 
it finishes pulling from git and installing dependencies.

## Route
1. Creating directory names with current timestamp;
2. Git-cloning default branch into that directory;
3. Running `yarn install`;
4. Running your `command` defined in `.deploy`;
5. Cleaning your build directory (removing `node_modules`, `.git` etc. files);
6. Rsyncing the remaining files to your host and directory defined in `.deploy`.