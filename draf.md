
```
# OLD VERSION WITH MONGO LOCAL

# version: '3.8'
# services:
#   backend:
#     build: ./backend_cms_doc_time
#     container_name: backend_cms_doc_time
#     ports:
#       - $BACKENDPORT:9999
#     volumes:
#       - ./backend_cms_doc_time:/app
#     networks:
#       - backend_network
#       - frontend_network
#     depends_on:
#       - database
#   frontend:
#     build: ./frontend_cms_doc_time
#     container_name: frontend_cms_doc_time
#     ports:
#       - $FRONTENDPORT:5173
#     volumes:
#       - ./frontend_cms_doc_time:/app
#     networks:
#       - frontend_network
#   database:
#     image: mongo:latest
#     container_name: cms_mongo_db
#     ports:
#       - 27019:27017
#     volumes:
#       - cms_mongodb_data:/data/db
#     networks:
#       - backend_network
# volumes:
#   cms_mongodb_data:
# networks:
#   backend_network:
#   frontend_network:

```