package es.urjc.jer.game;

public class Roca {

	private int x, y;
	private int life;
	
	Roca() {
		this.life = 3;
	}
	
	//GETTERS Y SETTERS DE LA POSICIÓN Y LA VIDA
	
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
	
	public void setLife (int life) {
		this.life = life;
	}
	
	public int getLife () {
		return this.life;
	}

	@Override
	public String toString() {
		return "Roca [x=" + x + ", y=" + y + ", life=" + life + "]";
	}

}
