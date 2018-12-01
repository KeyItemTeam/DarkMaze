package es.urjc.jer.game;

public class Antorcha {
	
	private int x, y;
	
	//GETTERS Y SETTERS
	
	public int getX () {
		return this.x;
	}
	
	public void setX (int x) {
		this.x = x;
	}
	
	public void setY (int y) {
		this.y = y;
	}
	
	public int getY () {
		return this.y;
	}

	@Override
	public String toString() {
		return "Antorcha [x=" + x + ", y=" + y + "]";
	}

}
