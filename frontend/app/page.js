"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import socket from "@/services/socket";
import Link from "next/link";

export default function Home() {
  const [feeds, setFeeds] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeeds();

    socket.on("new-feed", (newFeed) => {
      setFeeds((prev) => {
        const exists = prev.find(
          (item) => item._id === newFeed._id
        );

        if (exists) return prev;

        return [newFeed, ...prev];
      });
    });

    return () => {
      socket.off("new-feed");
    };
  }, []);

  const fetchFeeds = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/gfeed`
      );

      setFeeds(res.data.feeds);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <h2>Loading feeds...</h2>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <div style={styles.navbar}>
        <h1 style={styles.heading}>
          Realtime Coaching Feed
        </h1>

        <Link href="/admin" style={styles.button}>
          Admin Panel
        </Link>
      </div>

      <div style={styles.feedContainer}>
        {feeds.length === 0 ? (
          <div style={styles.emptyCard}>
            <p>No feeds available</p>
          </div>
        ) : (
          feeds.map((feed) => (
            <div
              key={feed._id}
              style={styles.feedCard}
            >
              <div style={styles.feedTop}>
                <div style={styles.avatar}>
                  {feed.message?.charAt(0)}
                </div>

                <div>

                  <p style={styles.feedMessage}>
                    {feed.message}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
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
    fontSize: "38px",
    color: "#222",
    margin: 0,
  },

  button: {
    backgroundColor: "#2563eb",
    color: "white",
    padding: "12px 20px",
    borderRadius: "8px",
    textDecoration: "none",
    fontWeight: "bold",
  },

  feedContainer: {
    display: "grid",
    gap: "20px",
  },

  feedCard: {
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "14px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
  },

  feedTop: {
    display: "flex",
    gap: "15px",
    alignItems: "flex-start",
  },

  avatar: {
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    backgroundColor: "#2563eb",
    color: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "22px",
    fontWeight: "bold",
  },

  feedTitle: {
    margin: "0 0 8px 0",
    color: "#111",
  },

  feedMessage: {
    margin: 0,
    color: "#555",
    lineHeight: "1.6",
  },

  loadingContainer: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  emptyCard: {
    backgroundColor: "white",
    padding: "30px",
    borderRadius: "12px",
    textAlign: "center",
  },
};