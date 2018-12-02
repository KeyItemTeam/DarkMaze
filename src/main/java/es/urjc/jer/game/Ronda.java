package es.urjc.jer.game;

public class Ronda {

	private int numRonda;
	private float tiempoRonda;

	Ronda() {
		this.numRonda = 1;
		this.tiempoRonda = 300;
	}
	
	//MÉTODOS
	
	public void setNumRonda (int numRonda) {
		this.numRonda = numRonda;
	}
	
	public int getNumRonda () {
		return this.numRonda;
	}

	public void setTiempoRonda (float tiempoRonda) {
		this.tiempoRonda = tiempoRonda;
	}
	
	public float getTiempoRonda () {
		return this.tiempoRonda;
	}

	@Override
	public String toString() {
		return "Ronda [Num=" + numRonda + ", Tiempo=" + tiempoRonda + "]";
	}

}
