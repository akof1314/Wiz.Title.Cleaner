var arr = new Array();
var arrBL = new Array();
var objApp = WizExplorerApp;
var pluginPath = objApp.GetPluginPathByScriptFileName("TitleCleaner.js");
var objWindow = objApp.Window;

function WizAlert(msg)
{
    objWindow.ShowMessage(msg, "Wiz", 0x00000040);
}

function Write2Text()
{
	var fso = new ActiveXObject("Scripting.FileSystemObject");
	var f = fso.CreateTextFile("BlackList.txt", true);
	for(var i=0;i<arr.length;i++)
	{
		f.write(arr[i])
		f.WriteBlankLines(1)
	}
	f.Close();
}

function GetHeader(src) 
{ 
	var ForReading=1; 
	var fso=new ActiveXObject("Scripting.FileSystemObject");
	var f = fso.OpenTextFile(src, ForReading, true); 
	return (f.ReadAll()); 
} 

function ReadText()
{
	// Get black list from file...
	arr=GetHeader(pluginPath + "BlackList.txt").split("\r\n");
	
	for(var i=0;i<arr.length;i++)
	{
		var objDoc = objApp.Window.CurrentDocument;
		if (objDoc==null)
        		return;
        	else
        	{	
        		var arrBL=splitBlackListItem(arr[i]);
        		
        		if (arrBL.length==1)
        		{
        			var reg=new RegExp(arrBL[0],"gmi");
        			objDoc.Title=objDoc.Title.replace(reg,"");
        		}
        		else
        		{
        			var reg=new RegExp(arrBL[0],"gmi");
        			objDoc.Title=objDoc.Title.replace(reg,arrBL[1]);
        			//objDoc.Title=objDoc.Title.replace(reg,"");
        		}
        	}
	}
}

function splitBlackListItem(BLI)
{
	var arrBLSP = new Array();
	arrBLSP=BLI.split('^^');
	return arrBLSP;
}

function InitTitleCleanerButton()
{
    var languangeFileName = pluginPath + "plugin.ini";
    var buttonText = objApp.LoadStringFromFile(languangeFileName, "strBtnName");
    objWindow.AddToolButton("document", "TitleCleanerButton", buttonText, "", "OnTitleCleanerButtonClicked");
}

function OnTitleCleanerButtonClicked() 
{
	ReadText();
}

InitTitleCleanerButton();