package kr.co.twoksystem.utils;

import java.util.*;
import java.util.Map.Entry;
import java.io.*;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;

import org.jdom2.*;
import org.jdom2.input.*;
import org.xml.sax.InputSource;
import org.xml.sax.SAXException;

// import org.jdom.output.*;

public class XmlUtil {

	// private static Logger log = Logger.getLogger(Xml.class); 

	private static SAXBuilder builder = new SAXBuilder();

	private static String root_node = "data";
	private static String child_node = "item";
	private static StringBuffer sb_xml = new StringBuffer();

	// iBATIS  
	@SuppressWarnings("rawtypes")
	public Document iBATISForMake(List result) throws Exception {
		Element data = new Element(root_node);

		for (int i = 0; i < result.size(); i++) {
			Element element = new Element(child_node);
			String xml = (String) result.get(i);
			Document document = builder.build(new StringReader(xml));

			Element root = document.getRootElement();
			List child = root.getChildren();
			for (Iterator iter = child.iterator(); iter.hasNext();) {
				Element node = (Element) iter.next();

				String name = (String) node.getName();
				String value = (String) node.getText();
				//addElement(element,name,value); 
				addAttribute(element, name, value);
			}
			data.addContent(element);
		}
		Document document = new Document(data);
		return document;
	}

	// 占쎌꼶�곭솒�노뱜 占쎌빘苑�
	public Element addElement(Element parent, String name, String value) {
		Element element = new Element(name);
		element.setText(value);
		parent.addContent(element);
		return parent;
	}

	// 占쎌쥚�껆뵳���옙占쏙옙�밴쉐 
	public static void addAttribute(Element element, String name, String value) {
		Attribute attribute = new Attribute(name, value);
		element.setAttribute(attribute);
	}
	
	@SuppressWarnings("unchecked")
	private static String map2XML(Map<String, Object> map) {
	    for(Entry<String, Object> entry : map.entrySet()) {
	    	String ls_key = entry.getKey();
	        Object value = entry.getValue();
	        if(value instanceof Map) {
	        	map2XML((Map<String, Object>) value);
	        } else if (value instanceof List) {
	        	List<Map<String, Object>> list = (List<Map<String, Object>>) value;
	            for(int i=0; i < list.size(); i++)
	            	map2XML(list.get(i));
	        } else {
	        	sb_xml.append("<" + ls_key + ">" + value.toString() + "</" + ls_key + ">");
	        }
	    }
	    return sb_xml.toString();
	}

	public static String map2XMLStr(Map<String, Object> map) {
		sb_xml = new StringBuffer();
		String ls_xml = "<?xml version=\"1.0\" encoding=\"UTF-8\"?><root>" + map2XML(map) + "</root>";
		return ls_xml;
	}	
	
    public static Document map2XMLDoc(HashMap<String, Object> map) throws SAXException, IOException, ParserConfigurationException {
		sb_xml = new StringBuffer();
		String ls_xml = "<?xml version=\"1.0\" encoding=\"UTF-8\"?><root>" + map2XML(map) + "</root>";
	    DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
	    DocumentBuilder builder = factory.newDocumentBuilder();
	    Document document = (Document) builder.parse(new InputSource(new StringReader(ls_xml)));
	    // NodeList nodelist = document.getElementByTagName("root");
	    // Node     node_1   = nodelist.item(0);
	    // Node     node_2   = nodelist.item(0).getChildNodes().item(0);
	    // System.out.println(node_2.getNodeValue());
	    return document;
    }
	
}
