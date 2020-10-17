# Fat Ball o Monstruo come circulos. :basketball:
Ejemplo de aplicación de patrones de diseño a un juego muy básico.
En este juego encontramos los siguientes patrones de diseño:

## 1. Patrón Observer :eyes:
Observa los **cambios de estado** que tenga un **sujeto u objeto** para notificar sus suscripciones.
Para este juego el objeto **BallFood** (Bola-comida) **se suscribe a las BallGamer**(Bola del jugador).  
Este Patrón se usa para detectar la colisión, generando que se reubique BallFood (comida) y que se incremente el radio del BallGamer.
### Según esto tenemos en el código:

### Diagrama Patrón Observer


## 2. Patrón Singleton :walking:
Observa los **cambios de estado** que tenga un sujeto u objeto para notificar sus suscripciones.
Para este juego el sujeto u objeto que es el **BallGamer** y se suscribe a las **BallFood.** 
### Según esto tenemos en el código:

### Diagrama Patrón Singleton

![Diagrama Clases-Singleton](imagenes/DiagramaClasesJuegoPython-Observador.png)

## 3. Patrón Mediator :speech_balloon:

Factory: Forma de creación de bolas enemigas (Aleatoria, dependiendo del nivel...)
Memento: Cuando estoy en un puntaje determinado y me comen puedo volver al estado (Check point)
Prototype: Clonación de de enemigos
Mediator: Informar el score, decoración y ambiente

### Según esto tenemos en el código:

### Diagrama Patrón Mediator

## Bibliografía
https://anexsoft.com/patron-observador-con-javascript-observer-pattern

