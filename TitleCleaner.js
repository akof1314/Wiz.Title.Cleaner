var TitleCleaner_pluginPath = objApp.GetPluginPathByScriptFileName("TitleCleaner.js");

function TitleCleaner_GetHeader(src)
{
    return objCommon.LoadTextFromFile(src);
}

function TitleCleaner_ReadText()
{
    var arr = TitleCleaner_GetHeader(TitleCleaner_pluginPath + "BlackList.txt").split("\n");

    for (var i = 0; i < arr.length; i++)
    {
        var objDoc = objWindow.CurrentDocument;
        if (objDoc == null)
        {
            return;
        }
        else
        {
            var arrBL = TitleCleaner_splitBlackListItem(arr[i]);

            if (arrBL.length == 1)
            {
                var reg = new RegExp(arrBL[0], "gmi");
                objDoc.Title = objDoc.Title.replace(reg, "");
            }
            else
            {
                var reg = new RegExp(arrBL[0], "gmi");
                objDoc.Title = objDoc.Title.replace(reg, arrBL[1]);
            }
        }
    }
}

function TitleCleaner_splitBlackListItem(BLI)
{
    var arrBLSP = new Array();
    arrBLSP = BLI.split('^^');
    return arrBLSP;
}

function InitTitleCleanerButton()
{
    var languangeFileName = TitleCleaner_pluginPath + "plugin.ini";
    var buttonText = objApp.LoadStringFromFile(languangeFileName, "strBtnName");
    objWindow.AddToolButton("document", "TitleCleanerButton", buttonText, "", "OnTitleCleanerButtonClicked");
}

function OnTitleCleanerButtonClicked()
{
    TitleCleaner_ReadText();
}

InitTitleCleanerButton();
