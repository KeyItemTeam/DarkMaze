package es.urjc.jer.game;

public class Player {

	private long id;
	private int x, y;
	private int time;
	private int direction;
	private int pulsoX, pulsoY;
	private boolean attacking, running;


	public enum Type {
		MINOTAURO, TESEO, ICARO, MEDUSA, CICLOPE, PERSEFONE
	};

	Type type;

	Player() {
		this.time = 0;
		this.running = false;
		this.attacking = false;
		this.direction = 1;

	}

	public Type getType() {
		return type;
	}

	public void setType(Type type) {
		this.type = type;
	}

	public int getPulsoX() {
		return pulsoX;
	}

	public void setPulsoX(int pulsoX) {
		this.pulsoX = pulsoX;
	}

	public int getPulsoY() {
		return pulsoY;
	}

	public void setPulsoY(int pulsoY) {
		this.pulsoY = pulsoY;
	}

	public boolean isAttacking() {
		return attacking;
	}

	public void setAttacking(boolean attacking) {
		this.attacking = attacking;
	}

	public boolean isRunning() {
		return running;
	}

	public void setRunning(boolean running) {
		this.running = running;
	}

	public int getDirection() {
		return direction;
	}

	public void setDirection(int direction) {
		this.direction = direction;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public int getX() {
		return x;
	}

	public void setX(int x) {
		this.x = x;
	}

	public int getY() {
		return y;
	}

	public void setY(int y) {
		this.y = y;
	}

	public int getTime() {
		return time;
	}

	public void setTime(int time) {
		this.time = time;
	}

	@Override
	public String toString() {
		return "Player [id=" + id + ", x=" + x + ", y=" + y + ", time=" + time + ", direction=" + direction
				+ ", pulsoX=" + pulsoX + ", pulsoY=" + pulsoY + ", attacking=" + attacking + ", running=" + running
				+ ", type=" + type + "]";
	}

	
}
