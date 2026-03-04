package org.example.controller;

import org.example.model.DataPoint;
import org.example.model.ReportResponse;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reports")
@CrossOrigin
public class AnalyticsController {

    @GetMapping("/company-revenue")
    public ReportResponse getCompanyRevenue(
            @RequestParam String period) {

        // Mock data - replace with DB logic
        List<DataPoint> data = List.of(
                new DataPoint("Company A", 120000),
                new DataPoint("Company B", 95000),
                new DataPoint("Company C", 150000)
        );

        return new ReportResponse("Company Revenue (" + period + ")", data);
    }

    @GetMapping("/cert-revenue")
    public ReportResponse getCertRevenue(
            @RequestParam String period) {

        List<DataPoint> data = List.of(
                new DataPoint("SSL", 200000),
                new DataPoint("EV", 125000),
                new DataPoint("Code Signing", 80000)
        );

        return new ReportResponse("Certificate Revenue (" + period + ")", data);
    }
}