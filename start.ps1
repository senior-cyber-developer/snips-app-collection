<#------------------------------------------------------------#>
<#--------- a small powershell script to run -----------------#>
<#--------- senior-cyber-developers voice assistant ----------#>
<#--------- --------------------------------------------------#>


Write-Host "Welcome to senior-cyber-developers Voice Assistant!"
Write-Host ""
<#------------------------------------------------------------#>
<#---------------- atarting ask-time -------------------------#>
<#------------------------------------------------------------#>
cd .\apps\ask-time
if((Test-Path .\node_modules)){
    WRITE-HOST "[Log] node_modules exists!"
    WRITE-HOST "[Log] starting ask-time app."
    start-process powershell -ArgumentList '-noexit -command npm start'
}else{
    WRITE-HOST "[Log] node_modules do not exist!"
    WRITE-HOST "[Log] stop starting ask-time app."
    WRITE-HOST "[Log] installing npm instead."
    start-process powershell -ArgumentList '-noexit -command npm install'
}
<#------------------------------------------------------------#>
<#--------------- Starting weather-demo ----------------------#>
<#------------------------------------------------------------#>
cd ..
cd .\weather-demo
if((Test-Path .\node_modules)){
    WRITE-HOST "[Log] node_modules exists!"
    WRITE-HOST "[Log] starting weather-demo app."
    start-process powershell -ArgumentList '-noexit -command npm start'
}else{
    WRITE-HOST "[Log] node_modules do not exist!"
    WRITE-HOST "[Log] stop starting weather-demo app."
    WRITE-HOST "[Log] installing npm instead."
    start-process powershell -ArgumentList '-noexit -command npm install'
}
<#------------------------------------------------------------#>
<#---------------- Starting intent-listener ------------------#>
<#------------------------------------------------------------#>
cd ..\..
cd .\intent-listener
if((Test-Path .\node_modules)){
    WRITE-HOST "[Log] node_modules exists!"
    WRITE-HOST "[Log] starting intent-listener app."
    start-process powershell -ArgumentList '-noexit -command npm start'
}else{
    WRITE-HOST "[Log] node_modules do not exist!"
    WRITE-HOST "[Log] stop starting intent-listener app."
    WRITE-HOST "[Log] installing npm instead."
    start-process powershell -ArgumentList '-noexit -command npm install'
}
<#------------------------------------------------------------#>
<#----------------- Starting snips-dashboard -----------------#>
<#------------------------------------------------------------#>
cd ..
cd .\snips-dashboard
if((Test-Path .\node_modules)){
    WRITE-HOST "[Log] node_modules exists!"
    WRITE-HOST "[Log] starting ask-time app."
    start-process powershell -ArgumentList '-noexit -command npm start'
}else{
    WRITE-HOST "[Log] node_modules do not exist!"
    WRITE-HOST "[Log] stop starting ask-time app."
    WRITE-HOST "[Log] installing npm instead."
    start-process powershell -ArgumentList '-noexit -command npm install'
}
cd ..

cd .\apps\news
if((Test-Path .\node_modules)){
    WRITE-HOST "[Log] node_modules exists!"
    WRITE-HOST "[Log] starting news app."
    start-process powershell -ArgumentList '-noexit -command npm start'
}else{
    WRITE-HOST "[Log] node_modules do not exist!"
    WRITE-HOST "[Log] stop starting news app."
    WRITE-HOST "[Log] installing npm instead."
    start-process powershell -ArgumentList '-noexit -command npm install'
}
cd ..\..


