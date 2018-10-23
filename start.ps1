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
if(![System.IO.File]::Exists('.\node_modules' )){
    WRITE-HOST "[Log] node_modules exists!"
    WRITE-HOST "[Log] starting ask-time app."
    start-process powershell -ArgumentList '-noexit -command npm start'
}else{
    WRITE-HOST "[Log] node_modules do not exist!"
    WRITE-HOST "[Log] stop starting ask-time app."
}
<#------------------------------------------------------------#>
<#--------------- Starting weather-demo ----------------------#>
<#------------------------------------------------------------#>
cd ..
cd .\weather-demo
if(![System.IO.File]::Exists('.\node_modules' )){
    WRITE-HOST "[Log] node_modules exists!"
    WRITE-HOST "[Log] starting weather-demo app."
    start-process powershell -ArgumentList '-noexit -command npm start'
}else{
    WRITE-HOST "[Log] node_modules do not exist!"
    WRITE-HOST "[Log] stop starting weather-demo app."
}
<#------------------------------------------------------------#>
<#---------------- Starting intent-listener ------------------#>
<#------------------------------------------------------------#>
cd ..\..
cd .\intent-listener
if(![System.IO.File]::Exists('.\node_modules' )){
    WRITE-HOST "[Log] node_modules exists!"
    WRITE-HOST "[Log] starting intent-listener app."
    start-process powershell -ArgumentList '-noexit -command npm start'
}else{
    WRITE-HOST "[Log] node_modules do not exist!"
    WRITE-HOST "[Log] stop starting intent-listener app."
}
<#------------------------------------------------------------#>
<#----------------- Starting snips-dashboard -----------------#>
<#------------------------------------------------------------#>
cd ..
cd .\snips-dashboard
if(![System.IO.File]::Exists('.\node_modules' )){
    WRITE-HOST "[Log] node_modules exists!"
    WRITE-HOST "[Log] starting ask-time app."
    start-process powershell -ArgumentList '-noexit -command npm start'
}else{
    WRITE-HOST "[Log] node_modules do not exist!"
    WRITE-HOST "[Log] stop starting ask-time app."
}
cd ..


