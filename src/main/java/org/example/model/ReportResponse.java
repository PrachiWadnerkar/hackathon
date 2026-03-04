package org.example.model;

import java.util.List;

public class ReportResponse {
    private String label;
    private List<DataPoint> data;

    public ReportResponse(String label, List<DataPoint> data) {
        this.label = label;
        this.data = data;
    }

    public String getLabel() { return label; }
    public List<DataPoint> getData() { return data; }
}