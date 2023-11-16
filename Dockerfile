FROM node:latest
# Add a work directory
WORKDIR /app
# Cache and Install dependencies
COPY package.json .
COPY package-lock.json .
RUN yarn install
#RUN npm install -g @mui/joy @mui/material @emotion/react @emotion/styled @mui/joy/Box @mui/joy/Card @mui/joy/Button @mui/joy/CardContent @mui/joy/Typography @mui/icons-material/FavoriteBorder @mui/joy/CardActions @mui/joy/IconButton
# Copy app files
COPY . .
# Expose port
EXPOSE 3000
# Start the app
CMD [ "yarn", "start" ]