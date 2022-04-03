<%@ WebHandler Language="C#" Class="editor_gzip_handler" %>

using System;
using System.Web;

using com.dext5;

public class editor_gzip_handler : IHttpHandler {

    public void ProcessRequest(HttpContext context)
    {

        DEXT5GZipHandler dext5 = new DEXT5GZipHandler();
        dext5.Process(context);
    }

    public bool IsReusable { get { return false; } }
}