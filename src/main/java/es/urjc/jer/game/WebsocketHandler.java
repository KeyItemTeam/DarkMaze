package es.urjc.jer.game;

import java.io.IOException;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;

public class WebsocketHandler extends TextWebSocketHandler {
	
	private Map<String, WebSocketSession> sessions = new ConcurrentHashMap<>(); //guarda los websockets que se crean
	private ObjectMapper mapper = new ObjectMapper(); //hace posible la lectura de objetos json con jackson
	
	@Override //crea sesión cuando te conectas
	public void afterConnectionEstablished(WebSocketSession session) throws Exception {
		System.out.println("New user: " + session.getId());
		sessions.put(session.getId(), session);
		
	}
	
	@Override //borra la sesión cuando te desconectas
	public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
		System.out.println("Session closed: " + session.getId());
		sessions.remove(session.getId());
	}
	
	@Override
	protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
		synchronized (message) {		}
		System.out.println("Message received: " + message.getPayload());
		JsonNode node = mapper.readTree(message.getPayload());
		
		switch (node.get("protocolo").asText()) {
		//un case para cada tipo de mensaje y un default
		case "CREATE_RONDA":
			gameController.createRonda();
			break;
		case "UPDATE_RONDA":
			gameController.updateRonda();
			break;
		case "GET_RONDA":
			gameController.getRonda();
			break;
		default:
			System.out.println("ERROR: Mensaje no soportado");
		}
		
	}

}
