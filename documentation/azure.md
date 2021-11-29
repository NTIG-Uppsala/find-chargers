## Azure setup

If the project already has an app service in Azure you only need to get invited to the project and log in to your account. 

The following numbered list explains how to make an App Service, skip these steps if there already is an App service in the project.
1. Log in to Azure in your browser
2. Press Create a resource
3. select Web app. 
4. Select a subscription 
5. Create a new resource group
6. Enter a name for the App service
7. Choose runtime stack for the language you are coding in (In our case we chose Node)
8. Choose operating system
9. Choose your most relevant region
10. Create a new Service plan
11. Press Review + Create
12. Finally press Create

Once you have your app service set up you can download the vs code extension "Azure App Service". 
    Extension ID: ms-azuretools.vscode-azureappservice
Press the new Azure logo in the vs code sidebar and then log in to your microsoft account that you used for Azure.

You can find the uploaded files in the Files tab under the project name in App Service. 

To manually upload files press the "Deploy to web app" cloud icon in the Azure extension on the App Service tab. 
There is also a github workflow that automatically uploads to azure when there is a push to main.
