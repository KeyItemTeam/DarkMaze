package es.urjc.jer.game;

public class Player {

	private long id;
	private int x, y;
	private int time;
	private int direction;
	private boolean attack, run;


	public enum Type {
		MINOTAURO, TESEO, ICARO, MEDUSA, CICLOPE, PERSEFONE
	};

	Type type;

	Player() {
		this.time = 0;
		this.run = false;
		this.attack = false;
		this.direction = 1;

	}

	public Type getType() {
		return type;
	}

	public void setType(Type type) {
		this.type = type;
	}

	public boolean isAttack() {
		return attack;
	}

	public void setAttack(boolean attack) {
		this.attack = attack;
	}

	public boolean isRun() {
		return run;
	}

	public void setRun(boolean run) {
		this.run = run;
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
				+ ", attack=" + attack + ", run=" + run + ", type=" + type + "]";
	}
}
