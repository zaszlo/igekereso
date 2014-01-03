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
API tudja ezeket, a linké alakító js csak részben, ezért is tettem fel. 

Ezen kívül lehet használni az API "gépnyelvét", ami OSIS formátumhoz igazodik
(http://www.bibletechnologies.net/). Erre egy példa:

online-biblia.ro/igekereso.php?igehely=1mozes.1.2-1mozes.1.3&osis=true&title=cím

A példából megfigyelendő, hogy használható a "title" paraméter saját cím megadására.

Az igehelyként felismert részek kapnak egy "igehely" osztályt (class), tehát a
megjelnítése saját stílusra szabható. Alapból az oldal anchor stílusát használja.

A felugró ablak stílusán szívesen veszem az egyszerűsítést szépítést, egyelőre
nem lehetséges js változóból/egyszerűen stílust váltani. Az igekereső által
használt html tagok közszemlére vannak bocsájtva, lehet ajánlani jobb css-t vagy
akár html markup javításokat, stb..

Két lépésben építheted be egy honlapba (így nem kell bookmarklet-et nyomogatni):

1. A weboldalnak a <head> és </head> részei közé másold a következő két sort:
<script type="text/javascript" src="igezopopup.js"></script>
<script type="text/javascript" src="reforbit.js"> </script>
Ezt a beágyazását a népszerűbb tartalomkezelőkben a következő helyen találod:
Wordpress/wp-content/themes/sablon/header.php
Joomla/templates/sablon/index.php
Drupal/themes/sablon/page.tpl.php

2. A két js-et helyezd ugyanabba a könyvtárba ahol az előző lépésben a módosítás
történt.