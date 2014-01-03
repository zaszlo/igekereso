igekereső
=========

igekereső bookmarklet

Pár példa, hogy az API, ami kiszolgálja a bookmarkletet milyen formátumokat
tud azonosítani:

1Móz 1:2		1Móz 1:1,3,5		1Móz 1,2-4			1Móz 1.2-2.25
1Móz 1,2		1Móz 1:3; 3:5		1Móz 1:2-2:25		1Móz 1:1,7-10
1Móz 1.2		1Móz 1:2-4			1Móz 1,2-2,25		

pl.: http://online-biblia.ro/igekereso.php?igehely=1Moz+1,3;+2,1;+3,6-8

Ez nem azt jelenti, hogy a bookmarklet ennyi féle formátumot alakít linké, az 
API tudja ezeket, a linké alakító js csak részben, ezért is tettem fel. A fel-
ismerést a reforbiter.js fájlban a regexp-ek javításával lehet (tenni #1). A
bonyolultabb formátumoknál pedig valahogy OSIS formátumban kéne átadni az ige-
helyet (tenni #4).

Ezen kívül lehet használni az API "gépnyelvét", ami OSIS formátumhoz igazodik
(http://www.bibletechnologies.net/). Erre egy példa:

online-biblia.ro/igekereso.php?igehely=1mozes.1.2-1mozes.1.3&osis=true&title=cím

A példából megfigyelendő, hogy használható a "title" paraméter saját cím megadására.

Az igehelyként felismert részek kapnak egy "igehely" osztályt (class), tehát a
megjelnítése saját stílusra szabható. Alapból az oldal anchor stílusát használja.

A felugró ablak stílusán szívesen veszem az egyszerűsítést szépítést (tenni #2),
egyelőre nem lehetséges js változóból/egyszerűen stílust váltani (tenni #3). 
Az igekereső által használt html tagok közszemlére vannak bocsájtva, lehet 
ajánlani jobb css-t vagy akár html markup javításokat, stb.. (tenni #2)

Két lépésben építheted be egy honlapba (így nem kell bookmarklet-et nyomogatni):

1. A weboldalnak a &lt;head&gt; és &lt;/head&gt; részei közé másold a következő két sort:
&lt;script type="text/javascript" src="igezopopup.js"&gt;&lt;/script&gt;
&lt;script type="text/javascript" src="reforbit.js"&gt; &lt;/script&gt;
Ezt a beágyazását a népszerűbb tartalomkezelőkben a következő helyen találod:
Wordpress/wp-content/themes/sablon/header.php
Joomla/templates/sablon/index.php
Drupal/themes/sablon/page.tpl.php

2. A két js-et helyezd ugyanabba a könyvtárba ahol az előző lépésben a módosítás
történt.

Az igekereso.html és igekereso_alap.css csak szerver oldalon szükségesek, 
a felugró iframe elkészítéséhez és stílus szabásához.

Inspirációs linkek a tovább fejlesztésre:
- https://github.com/openbibleinfo/Bible-Passage-Reference-Parser
  Be lehetne építeni, hogy OSIS-ba alakítson át a bookmarklet és úgy küldjön.
  (tenni #4)
- http://www.biblesupersearch.com/bible_supersearch_user_guide.html
- http://scripturereference.codeplex.com/
- http://davidwparker.com/2010/03/04/parsing-bible-searches/
- http://stackoverflow.com/questions/9974012/php-preg-match-bible-scripture-format

A feljegyzett 4 tennivaló után elmondhatnánk, hogy sikerült összehozni egy
érett igekeresőt! Ha ezt te is szívesen látnád, láss hozzá :-)