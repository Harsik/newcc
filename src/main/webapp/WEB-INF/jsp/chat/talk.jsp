<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
    <title>Apache Tomcat WebSocket Examples: Echo</title>
    <style type="text/css">
        #connect-container {
            float: left;
            width: 400px
        }

        #connect-container div {
            padding: 5px;
        }

        #console-container {
            float: left;
            margin-left: 15px;
            width: 400px;
        }

        #console {
            border: 1px solid #CCCCCC;
            border-right-color: #999999;
            border-bottom-color: #999999;
            height: 170px;
            overflow-y: scroll;
            padding: 5px;
            width: 100%;
        }

        #console p {
            padding: 0;
            margin: 0;
        }
    </style>
    
	<script type="text/javascript" src="<c:url value='/resources/js/lib/jquery-2.1.1.min.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/resources/js/common/common.js'/>"></script>
    <script type="application/javascript">
    <!--
        var ws = null;

        function setConnected(connected) {
            document.getElementById('connect').disabled = connected;
            document.getElementById('disconnect').disabled = !connected;
            document.getElementById('echo').disabled = !connected;
        }

        function connect() {
            var target = document.getElementById('target').value;
            if (target == '') {
                alert('Please select server side connection implementation.');
                return;
            }
            if ('WebSocket' in window) {
                ws = new WebSocket(target);
            } else if ('MozWebSocket' in window) {
                ws = new MozWebSocket(target);
            } else {
                alert('WebSocket is not supported by this browser.');
                return;
            }
            ws.onopen = function () {
                setConnected(true);
                log('Info: WebSocket connection opened.');
            };
            ws.onmessage = function (event) {
//                log('Received: ' + event.data);
                log(event.data);
            };
            ws.onclose = function (event) {
                setConnected(false);
                log('Info: WebSocket connection closed, Code: ' + event.code + (event.reason == "" ? "" : ", Reason: " + event.reason));
            };
        }

        function disconnect() {
            if (ws != null) {
                ws.close();
                ws = null;
            }
            setConnected(false);
        }

        function echo() {
            if (ws != null) {
                var message = document.getElementById('message').value;
//                log('Sent: ' + message);
                var lsTarget = document.getElementById('target').value;
                var laSender = lsTarget.split('/');
                var sender_id = laSender[laSender.length - 2];
                var sender_nm = laSender[laSender.length - 1];
                var pObj = {type:1, sender_id:sender_id, sender_nm:sender_nm, msg:message, receivers:document.getElementById('receivers').value};
                ws.send(JSON.stringify(pObj));
            } else {
                alert('WebSocket connection not established, please connect.');
            }
        }

        function updateTarget(target) {
            if (window.location.protocol == 'http:') {
                document.getElementById('target').value = 'ws://'  + window.location.host + target;
            } else {
                document.getElementById('target').value = 'wss://' + window.location.host + target;
            }
        }

        function log(message) {
            var console = document.getElementById('console');
            var p = document.createElement('p');
            p.style.wordWrap = 'break-word';
            p.appendChild(document.createTextNode(message));
            console.appendChild(p);
            while (console.childNodes.length > 25) {
                console.removeChild(console.firstChild);
            }
            console.scrollTop = console.scrollHeight;
        }


        document.addEventListener("DOMContentLoaded", function() {
            // Remove elements with "noscript" class - <noscript> is not allowed in XHTML
            var noscripts = document.getElementsByClassName("noscript");
            for (var i = 0; i < noscripts.length; i++) {
                noscripts[i].parentNode.removeChild(noscripts[i]);
            }
        }, false);
        -->
    </script>
</head>
<body>
<div class="noscript"><h2 style="color: #ff0000">Seems your browser doesn't support Javascript! Websockets rely on Javascript being enabled. Please enable
    Javascript and reload this page!</h2></div>
<div>
    <div id="connect-container">
        <div>
            <span>Connect to service implemented using:</span>
            <!-- echo example using new programmatic API on the server side -->
            <br /><input id="radio1" type="radio" name="group1" value="websocket/echoProgrammatic"
                   onclick="updateTarget(this.value);"/> <label for="radio1">programmatic API</label>
            <!-- echo example using new annotation API on the server side -->
            <br /><input id="radio2" type="radio" name="group1" value="/websocket/echoAnnotation"
                   onclick="updateTarget(this.value);"/> <label for="radio2">annotation API</label>
            <!-- echo example using new annotation API on the server side -->
            <br /><input id="radio3" type="radio" name="group1" value="/ws/globee_id/globee_nm"
                   onclick="updateTarget(this.value);"/> <label for="radio3">Chat</label>
        </div>
        <div>
            <input id="target" type="text" size="40" style="width: 350px"/>
        </div>
        <div>
            <button id="connect" onclick="connect();">Connect</button>
            <button id="disconnect" disabled="disabled" onclick="disconnect();">Disconnect</button>
        </div>
        <div>
            <textarea id="receivers" style="width: 100px">test01,test02, test03</textarea>
        </div>
        <div>
            <textarea id="message" style="width: 350px">Here is a message!</textarea>
        </div>
        <div>
            <button id="echo" onclick="echo();" disabled="disabled">Send Message</button>
        </div>
    </div>
    <div id="console-container">
        <div id="console"></div>
    </div>
</div>
</body>
</html>
