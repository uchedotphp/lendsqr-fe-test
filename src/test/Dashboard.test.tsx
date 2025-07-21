import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router";
import Dashboard from "../pages/Dashboard";

// Mock fetch globally
global.fetch = vi.fn();

describe("Dashboard Component - Data Integration & User Experience", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("Data Fetching Tests", () => {
    it("should fetch and display users data", async () => {
      const mockUsers = [
        { id: "1", firstName: "John", lastName: "Doe" },
        { id: "2", firstName: "Jane", lastName: "Smith" },
        { id: "3", firstName: "Bob", lastName: "Johnson" },
      ];

      (fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ records: mockUsers }),
      });

      render(
        <BrowserRouter>
          <Dashboard />
        </BrowserRouter>
      );

      // Check that fetch was called
      expect(fetch).toHaveBeenCalledWith("/users");

      // Wait for data to load and check display
      await waitFor(() => {
        expect(screen.getByText("John Doe")).toBeInTheDocument();
        expect(screen.getByText("Jane Smith")).toBeInTheDocument();
        expect(screen.getByText("Bob Johnson")).toBeInTheDocument();
      });
    });

    it("should handle API error gracefully", async () => {
      (fetch as any).mockRejectedValueOnce(new Error("Network error"));

      render(
        <BrowserRouter>
          <Dashboard />
        </BrowserRouter>
      );

      // Should still render the component even if API fails
      expect(screen.getByText("Users")).toBeInTheDocument();
    });

    it("should handle empty users data", async () => {
      (fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ records: [] }),
      });

      render(
        <BrowserRouter>
          <Dashboard />
        </BrowserRouter>
      );

      await waitFor(() => {
        expect(screen.getByText("Users")).toBeInTheDocument();
        // Should not crash with empty data
        expect(screen.queryByRole("listitem")).not.toBeInTheDocument();
      });
    });
  });

  describe("Visual Fidelity Tests", () => {
    it("should render dashboard with correct structure", async () => {
      const mockUsers = [{ id: "1", firstName: "John", lastName: "Doe" }];

      (fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ records: mockUsers }),
      });

      render(
        <BrowserRouter>
          <Dashboard />
        </BrowserRouter>
      );

      // Check for essential visual elements
      expect(screen.getByText("Users")).toBeInTheDocument();
      expect(screen.getByRole("list")).toBeInTheDocument();
    });

    it("should display user names correctly", async () => {
      const mockUsers = [
        { id: "1", firstName: "John", lastName: "Doe" },
        { id: "2", firstName: "Jane", lastName: "Smith" },
      ];

      (fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ records: mockUsers }),
      });

      render(
        <BrowserRouter>
          <Dashboard />
        </BrowserRouter>
      );

      await waitFor(() => {
        expect(screen.getByText("John Doe")).toBeInTheDocument();
        expect(screen.getByText("Jane Smith")).toBeInTheDocument();
      });
    });
  });

  describe("Responsive Design Tests", () => {
    it("should maintain functionality on different screen sizes", async () => {
      const mockUsers = [{ id: "1", firstName: "John", lastName: "Doe" }];

      (fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ records: mockUsers }),
      });

      // Test mobile viewport
      Object.defineProperty(window, "innerWidth", {
        writable: true,
        configurable: true,
        value: 375,
      });

      render(
        <BrowserRouter>
          <Dashboard />
        </BrowserRouter>
      );

      await waitFor(() => {
        expect(screen.getByText("Users")).toBeInTheDocument();
        expect(screen.getByText("John Doe")).toBeInTheDocument();
      });

      // Test desktop viewport
      Object.defineProperty(window, "innerWidth", {
        writable: true,
        configurable: true,
        value: 1200,
      });

      // Re-render for desktop
      render(
        <BrowserRouter>
          <Dashboard />
        </BrowserRouter>
      );

      await waitFor(() => {
        expect(screen.getByText("Users")).toBeInTheDocument();
        expect(screen.getByText("John Doe")).toBeInTheDocument();
      });
    });
  });

  describe("Component Behavior Tests", () => {
    it("should re-fetch data when component mounts", () => {
      (fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ records: [] }),
      });

      render(
        <BrowserRouter>
          <Dashboard />
        </BrowserRouter>
      );

      // Should call fetch on mount
      expect(fetch).toHaveBeenCalledTimes(1);
      expect(fetch).toHaveBeenCalledWith("/users");
    });

    it("should handle malformed API response", async () => {
      (fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ invalid: "response" }),
      });

      render(
        <BrowserRouter>
          <Dashboard />
        </BrowserRouter>
      );

      // Should not crash with malformed data
      await waitFor(() => {
        expect(screen.getByText("Users")).toBeInTheDocument();
      });
    });
  });
});
