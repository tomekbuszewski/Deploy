# Deploy script

Script creates new directory, makes git clone from your repo (from `master` branch) and send the resulting build to your server.

Deploy connects with your SFTP account. In order for this script to work you need to have ssh keys paired.

## Route
1. Creating directory names with current timestamp;
2. Git-cloning default branch into that directory;
3. Running `yarn install`;
4. Running your `command` defined in `.deploy`;
5. Cleaning your build directory (removing `node_modules`, `.git` etc. files);
6. Rsyncing the remaining files to your host and directory defined in `.deploy`;
7. Removing created earlier deploy directory (this can be omitted by using `-leave-build` argument).

## Installation
### Manually creating config file:
Create `.deploy` file and place inside there following data in JSON format:
```javascript
{
  "public": "path/to/your/directory",
  "user": "username",
  "host": "yourhost.com",
  "command": "for example: yarn install"
}
``` 

I believe these fields are pretty self-explanatory. The `command` is crucial here since you are telling the script what it needs to execute when it finishes pulling from git and installing dependencies.

### Using arguments
You can use command line to create `.deploy` file for you. All you need to do is run the script with the following arguments:

```
§ node node_modules/deploy/deploy.js -u USERNAME -h HOST -c COMMAND -p PATH/TO/PUBLIC
```

This will create `.deploy` file and render running the script with those arguments useless. For changing the file contents, edit it directly.

### Adding Deploy to your package.json

After creating `.deploy` you need to add a script in your `package.json`, like this:
```
"scripts": {
	deploy: "node node_modules/deploy/deploy.js [-leave-build]"
}
```

Or if you prefer, you can use this script directly from your shell:

```
§ node node_modules/deploy/deploy.js [-leave-build]
```

## Usage
Using Deploy is quite simple. All you need to do is to either run the previously defined npm script or use a shell command posted above.