#include <Servo.h>

const int MAX_SIGNAL = 2000;
const int MIN_SIGNAL = 700;
const int MOTOR_UNO = 11;
const int MOTOR_CUATRO = 6;
const int MOTOR_TRES = 9;
const int MOTOR_DOS = 10;

Servo motor1;
Servo motor2;
Servo motor3;
Servo motor4;

void setup() {
  Serial.begin(9600);
  Serial.println("Program begin...");
  Serial.println("This program will calibrate the ESC.");
  motor1.attach(MOTOR_UNO,MIN_SIGNAL,MAX_SIGNAL);
  motor2.attach(MOTOR_DOS,MIN_SIGNAL,MAX_SIGNAL);
  motor3.attach(MOTOR_TRES,MIN_SIGNAL,MAX_SIGNAL);
  motor4.attach(MOTOR_CUATRO,MIN_SIGNAL,MAX_SIGNAL);

  motor1.writeMicroseconds(800);
  motor2.writeMicroseconds(800); 
  motor3.writeMicroseconds(800); 
  motor4.writeMicroseconds(800); 
}

void loop() {
  if ( Serial.available() > 0) {
    char speedy;
    Serial.println("Serial esta activo");
    speedy = Serial.read();
    if(speedy == 'a')
    {
     Serial.println(1200);
      motor1.writeMicroseconds(1100);
      motor2.writeMicroseconds(1100); 
      motor3.writeMicroseconds(1100); 
      motor4.writeMicroseconds(1100);
    }
    if(speedy == 'b'){
      motor1.writeMicroseconds(800);
      motor2.writeMicroseconds(800); 
      motor3.writeMicroseconds(800); 
      motor4.writeMicroseconds(800);
    }
    
  }
}
