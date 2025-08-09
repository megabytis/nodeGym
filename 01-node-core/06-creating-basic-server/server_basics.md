# **Server Basics & Networking**

## **What is a Server?**

A **server** can refer to both **hardware** and **software**:

- **Hardware**: A physical machine (e.g., in a data center, your friend’s PC, or even your laptop) that runs server software.
- **Software**: A program or application that listens for client requests over a network and sends back responses, usually following specific communication protocols like **HTTP**, **FTP**, or **WebSocket**.

**Examples:** AWS EC2 instances, Linode servers, Azure VMs, etc.

---

## **Can My Laptop Be a Server?**

Technically **yes**, but practically **no** for production use because:

- Limited resources (CPU, RAM, storage, network speed).
- Not built for **24/7 uptime** or handling thousands of simultaneous connections.
- No static **public IP** (needed for consistent accessibility).
- You’d need to run server software manually (e.g., Nginx, Apache, `node server.js`).

---

## **Sockets**

A **socket** is the communication endpoint between two devices in a network.

- **Format:** `IP Address + Port Number`  
  Example: `102.209.1.3:80` (Port 80 = HTTP)
- **Client Socket:** Initiates a connection to the server.
- **Server Socket:** Listens for incoming connections on a specific port.

---

## **TCP/IP**

**TCP/IP** is a protocol stack that defines how devices communicate over a network.

- **TCP (Transmission Control Protocol)**

  - Splits data into packets.
  - Numbers them for correct ordering.
  - Resends if lost.  
    _Think of TCP as a guaranteed delivery service._

- **IP (Internet Protocol)**
  - Handles addressing & routing.
  - Ensures packets reach the correct device.  
    _Think of IP as the postal code system._

**Together:**  
`TCP = reliability & order`  
`IP = location & routing`

---

## **Client-Server Communication Flow**

1. **Client** opens browser & types a URL.
2. **DNS lookup** retrieves the server’s IP address.
3. **Socket connection** is created:
   - Client: `271.1.7.98:<random_port>`
   - Server: `102.209.1.3:80`
4. **TCP** breaks the request into packets & sends them.
5. **IP** routes packets to the correct destination.
6. **Server** processes request & sends back a response.
7. **Browser** reassembles packets into the final webpage.

---

## **Multiple Servers on the Same Machine**

Yes, possible — each server can listen on a **different port**.  
Example:

- `10.42.22.22:80` → HTTP server
- `10.42.22.22:21` → FTP server

---

## **Domain Name**

- A domain name maps to an IP address using **DNS**.
- **IP + Port Number** → Points to a specific application on the server.
- **IP + Port Number + Path** → Points to a specific API endpoint.

---

## **General Server Architecture**

- Main server handles client requests.
- Specialized servers:
  - **DB server** → Stores data.
  - **File server** → Stores media (images, videos, documents).
- Main server may fetch from these specialized servers before responding.

---

## **Node.js Server Architecture**

```
┌──────────────────────────────────────────┐
│              Client Requests             │
└───────────────┬──────────────────────────┘
                │
       [Load Balancer - optional]
                │
        ┌───────▼────────┐
        │ Node.js Server │
        └───────┬────────┘
                │
        Event Loop & Thread Pool
                │
        External Services (DB, Cache, APIs)
```

- **Event Loop** → Handles non-blocking operations & request routing.
- **Thread Pool** → Handles file I/O, DB queries, CPU-intensive tasks.

---

## **Socket vs WebSocket**

- **Socket:**

  - Basically, when we request to an webpage, a socket being created to communication, but after communication stop, socket closes automatically
  - if later we'll make another request to anothe rpage of hat same server, then it will again create an socket , like this it works....

  _* features *_

  - General term for an IP + port endpoint.
  - Used in all network communication.

- **WebSocket:**

  - It is the Modern version of 'socket'
  - Basically when we make an request to a server's page, after our communication over with the page, it won't be closed, the socket connection will remain alive for sometime
  - So, it PERSISTENT
  - Obviously it will require more resources to handle multiples requests + keeping all requests persistent

  _* features *_

  - Protocol for **full-duplex** communication (two-way, persistent).
  - Ideal for real-time apps (e.g., chat, live updates).

## **_ But, when we'll make an API call, we'll generally specify to 'Normal SOCKET' not 'websockets' _**
