# GDD

# 1. Introducción

Este es el documento de diseño de DarkMaze, un videojuego multijugador para PC. Aquí quedarán plasmados todos los elementos incluidos en DarkMaze.

  # 1.1. Concepto del juego
  
  DarkMaze es un juego multijugador basado en el Laberinto de Creta de la mitología griega. Los dos personajes principales del juego son Ícaro y el minotauro. Durante las partidas cada jugador manejará a uno de los dos personajes, con el propósito de que el minotauro tenga que alcanzar a Ícaro, mientras que Ícaro debe intentar aguantar con vida el máximo tiempo posible.
  
  # 1.2. Características principales
  
  <b>Partidas dinámicas:</b> Ambos jugadores intercambian roles, las partidas son fluidas.
  
  <b>Toque estratégico:</b> Las dintintas habilidades y mecánicas aportan un toque de estrategia que hace a cada partida diferente.
  
  <b>Posibilidad de más contenido:</b> Sobre el juego se pueden añadir fácilmente más personajes, la posibilidad de jugar con más jugadores, nuevas habilidades u objetos, etc...
 
  # 1.3. Género
  
  Se trata de un juego Arcade de sigilo y multijugador. El que juegue como minotauro será el perseguidor y el que juegue como Ícaro será el perseguido
  
  # 1.4. Propósito y público objetivo
  
  El propósito del juego es intentar aportar una experiencia multijugar divertida. Cada partida del juego es diferente para que este pueda disfrutarse una y otra vez.
  
  El juego va dirigido a cualquier jugador que quiera disfrutar de una partida rápida con amigos en un juego de reglas sencillas pero que puede ser bastante estratégico.
  
  # 1.5. Jugabilidad
  
  En DarkMaze se juega como Ícaro (perseguido) o como el Minotauro (perseguidor), cada uno funciona de la siguiente manera:
  
  ![Idea de la jugabilidad del juego](https://i.imgur.com/1FevQQ1.png)
  
  <b>Minotauro:</b> El minotauro ha de buscar a Ícaro a traves de un laberinto muy oscuro, el Minotauro tiene una fuente de luz que le permite ver un poco a su alrededor. Su visibilidad reducida se ve recompensada con una mayor velocidad.
  La visibilidad reducida implica que no ve la posición de ícaro a menos que este corra pero sí que es capaz de ver en la penumbra las paredes del laberinto completo, es decir, su estructura, y podrá basarse en esta para crear una estrategia.
  El minotauro posee un botón de ataque, con él, podrá atrapar a Ícaro y destrozar las rocas del camino que coloque Ícaro al huír.
  Entre sus habilidades especiales, el Minotauro puede poner dos faros en el mapa que iluminarán una zona permanentemente. Los faros podrán ser regogidos por el Minotauro si este se desplaza hasta su posición para poder ser puestos en otras zonas del mapa.
  Finalmente, el Minotauro posee una barra que al cargarse, podrá usar para iluminar durante un breve periodo de tiempo su fuente de luz aumentando el rango de esta, ayudando así a encontrar a Ícaro con más facilidad.
  
  <b>Ícaro:</b> Ícaro es el jugador que debe esconderse. Su fuente de luz es mucho más amplia que la del Minotauro, por lo que puede verlo desde mucha más distancia, también puede ver la estructura del laberinto en la penumbra. En cambio, su velocidad es menor y por defecto caminará.
  Ícaro puede correr, pero esto generará un pulso que puede ser visto por el Minotauro, alertando así la posición de Ícaro.
  Finalmente, puede poner una roca durante la partida a sus espaldas, cortando así el paso al minotauro. Solo puede colocar una roca por partida.
  
  # 1.6. Estilo visual
  
  ![Concept del Minotauro](https://i.imgur.com/ENoZsPI.png)
  
  El juego está ambientado en el Laberinto de Creta, de la mitología griega. Por tanto, el juego tiene una estética griega, con personajes como el Minotauro y otros personajes típicos de mitología.
  
  # 1.7. Alcance

El juego trata de ser una experiencia divertida multijugador en la que se puedan seguir añadiendo estratégicos para aumentar la profundidad de este.


# 2. Mecánicas de juego

En este apartado detallaremos todas las mecánicas de DarkMaze, incluyendo los elementos básicos de la jugabilidad y las acciones  que puede realizar cada jugador durante una partida.

  # 2.1. Jugabilidad
  
  <b>Escenarios:</b> Todos los posibles escenarios del juego son distintos laberintos en los que pueden transcurrir las partidas. Cada laberinto tendrá un diseño distinto para conseguir que cada partida sea distinta y transcurra de forma diferente.
  
  <b>Habilidades:</b> Cada jugador tiene una habilidad distinta. El Minotauro tiene la capacidad de utilizar dos antorchas en cualquier lugar del escenario para iluminar parte del laberinto y encontrar a Ícaro con mayor facilidad, mientras que Ícaro tiene las habilidades de colocar rocas que le permitan bloquear el camino y aumentar su velocidad para huir con mayor facilidad.
  
  <b>Pulsos:</b> Los pulsos serán pequeñas luces rojas que aparecerán en la posición de Ícaro si éste decide correr para aumentar su velocidad, de esta forma el Minotauro podrá ver durante un instante en qué posición se encuentra Ícaro en ese momento.
  
  # 2.2. Flujo de juego
  
  En este apartado se detalla el transcurso de una partida de DarkMaze y se describen todos los pasos que puede seguir cada jugador hasta finalizar la partida.
  
  Al iniciar el juego se presenta el Menú Principal, donde el jugador tiene disponible la opción Jugar para empezar una partida. Antes de comenzar, se elige aleatoriamente qué personaje manejará inicialmente el jugador y en qué escenario transcurrirá la partida.
  
  Una vez comienza la partida, el personaje de Ícaro y del Minotauro aparecerán en esquinas opuestas del escenario y comenzará un contador que servirá para saber cuánto tiempo ha sobrevivido Ícaro.
  El personaje del Minotauro tiene su propio rango de visión, pero tendrá disponibles desde el comienzo de la partida dos antorchas que puede colocar en cualquier parte del escenario para detectar a Ícaro si pasa por esas zonas, y su objetivo será buscar a Ícaro por todo el escenario para atraparlo.
  En caso de que el Minotauro encuentre a Ícaro, éste último podrá colocar una roca que que bloquee el camino o correr para intentar huir.
  
  Una vez el Minotauro haya atrapado a Ícaro, parará el contador y se guardará el tiempo que haya transcurrido. Después, se intercambiarán los roles y el jugador que haya manejado al Minotauro en la primera ronda tendrá que manejar a Ícaro y viceversa.
  
  Cuando haya terminado la segunda ronda, se compararán los dos tiempos y ganará la partida el jugador que haya aguantado más tiempo con vida manejando a Ícaro.
  
  Se les propondrá a los jugadores iniciar una partida nueva en un mapa distinto, en cuyo caso se repite el flujo de juego o abandonar.
  
  # 2.3. Personajes
  
  En este apartado describiremos los personajes de DarkMaze y sus habilidades.
  
  <b>Ícaro:</b> Ícaro es el personaje que debe intentar huir. Su objetivo es sobrevivir el mayor tiempo posible para ganar la partida. Este personaje tiene dos habilidades que puede utilizar: Colocar rocas para bloquear el camino y correr para aumentar su velocidad.
    
  <b>Minotauro:</b> El Minotauro debe intentar atrapar a Ícaro en el menor tiempo posible. Tiene una única habilidad, que consiste en colocar dos antorchas en cualquier lugar del escenario que le permitan encontrar a Ícaro con mayor facilidad.
  
  # 2.4. Controles
  
  Los jugadores tendrán la posibilidad de moverse por el escenario y de utilizar habilidades. Además, el personaje de Ícaro tendrá la posibilidad de correr para aumentar su velocidad.
  
  - Movimiento: Teclas W,A,S,D
  - Usar habilida activa (ícaro colocar bloque y minotauro atacar): barra espaciadora
  - Colocar linternas (en el caso del minotauro): tecla R
  - Correr: Tecla Mayús
  
# 3. Interfaz



# 4. Equipo de desarrollo

Carlos Padina González
(correo de la universidad)
GitHub: (nombre de la cuenta de github)

Laura Suonpera Lozano
l.suonpera@alumnos.urjc.es
GitHub: lauraluna96

Guillermo Mena Molina
g.menam@alumnos.urjc.es
GitHub: guillermomena

Repositorio: https://github.com/KeyItemTeam/DarkMaze
  
  
 

[¡Gracias!](https://i.imgur.com/62oaFrk.png)
