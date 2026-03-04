package org.example.model;

public class DataPoint {
    private String name;
    private double revenue;

    public DataPoint(String name, double revenue) {
        this.name = name;
        this.revenue = revenue;
    }

    public String getName() { return name; }
    public double getRevenue() { return revenue; }
}