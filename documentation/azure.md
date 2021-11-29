## Azure setup

If the project already has an app service in Azure you only need to get invited to the project and log in to your account. 

To make a new app service in Azure you need to log in and press "Create a resource" and then select Web app. 
1. Select a subscription 
2. Create a new resource group
3. Enter a name for the App service
4. Choose runtime stack for the language you are coding in (In our case we chose Node)
5. Choose operating system
6. Choose your most relevant region
7. Create a new Service plan
8. Press Review + Create
9. Finally press Create

Once you have your app service set up you can download the vs code extension "Azure App Service". 
    Extension ID: ms-azuretools.vscode-azureappservice
Press the new Azure logo in the vs code sidebar and then log in to your microsoft account that you used for Azure.

You can find the uploaded files in the Files tab under the project name in App Service. 

To upload files press the "Deploy to web app" cloud icon in the Azure extension on the App Service tab. 