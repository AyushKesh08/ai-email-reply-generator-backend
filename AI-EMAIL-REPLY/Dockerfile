FROM eclipse-temurin:17-jdk

WORKDIR /app

COPY . .

RUN chmod +x mvnw

RUN ./mvnw clean package -DskipTests

EXPOSE 8981

CMD ["sh", "-c", "java -jar target/AI-EMAIL-REPLY-0.0.1-SNAPSHOT.jar --server.port=${PORT:8981}"]
