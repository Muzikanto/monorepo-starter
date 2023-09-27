import { Injectable } from '@nestjs/common';
import { AuthGuard as BaseAuthGuard } from '@nestjs/passport';

// curl -X POST http://localhost:4000/api/auth/login -d '{"username": "test1677158740229", "password": "test"}' -H "Content-Type: application/json"
// curl -X POST http://localhost:4000/api/auth/user -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3QxNjc3MTU4NzQwMjI5IiwidXNlcklkIjoidGVzdDE2NzcxNTg3NDAyMjkiLCJpYXQiOjE2NzcxNTk1NTgsImV4cCI6MTY3NzE2MzE1OH0.m0JKDO4TadI2HNjkpCthimHMWQtaeDrDwiH2Jg70t50"

@Injectable()
export class LocalAuthGuard extends BaseAuthGuard('local') {}
