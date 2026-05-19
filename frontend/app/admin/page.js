"use client";

import { useState } from "react";
import axios from "axios";
import Link from "next/link";

export default function AdminPage() {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/cfeed`,
        {
          title,
          message,
        }
      );

      alert("Feed Added Successfully");

      setTitle("");
      setMessage("");
    } catch (error) {
      console.log(error);

      alert("Error adding feed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.navbar}>
        <h1 style={styles.heading}>
          Admin Dashboard
        </h1>

        <Link href="/" style={styles.homeButton}>
          Go to Home
        </Link>
      </div>

      <div style={styles.card}>
        <h2 style={styles.subHeading}>
          Add New Feed
        </h2>

        <form
          onSubmit={handleSubmit}
          style={styles.form}
        >
          <div>
            <label style={styles.label}>
              Feed Message
            </label>

            <textarea
              placeholder="Enter message"
              value={message}
              onChange={(e) =>
                setMessage(e.target.value)
              }
              style={styles.textarea}
              required
            />
          </div>

          <button
            type="submit"
            style={styles.button}
            disabled={loading}
          >
            {loading
              ? "Adding Feed..."
              : "Add Feed"}
          </button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    backgroundColor: "#f4f7fb",
    padding: "40px",
    fontFamily: "Arial",
  },

  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "40px",
  },

  heading: {
    fontSize: "36px",
    color: "#222",
    margin: 0,
  },

  homeButton: {
    backgroundColor: "#2563eb",
    color: "white",
    padding: "12px 18px",
    borderRadius: "8px",
    textDecoration: "none",
    fontWeight: "bold",
  },

  card: {
    maxWidth: "600px",
    margin: "auto",
    backgroundColor: "white",
    padding: "35px",
    borderRadius: "16px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
  },

  subHeading: {
    marginBottom: "25px",
    color: "#111",
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },

  label: {
    display: "block",
    marginBottom: "8px",
    fontWeight: "bold",
    color: "#333",
  },

  input: {
    width: "100%",
    padding: "14px",
    borderRadius: "10px",
    border: "1px solid #ccc",
    fontSize: "16px",
    outline: "none",
  },

  textarea: {
    width: "100%",
    minHeight: "140px",
    padding: "14px",
    borderRadius: "10px",
    border: "1px solid #ccc",
    fontSize: "16px",
    resize: "none",
    outline: "none",
  },

  button: {
    backgroundColor: "#2563eb",
    color: "white",
    border: "none",
    padding: "14px",
    borderRadius: "10px",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
  },
};