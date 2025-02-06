### ToDo list:

* Issue: JWT secret (JWT_SECRET) is not encrypted.
* Pipieline security: use token-based authentication instead of username/password when pushinh the image to DockerHub.
* Issue: PostgresDB currently requires independent ec2 instance. consider deploy it as in local app db, or in independent container with postgres docker image.
* Issue: The pipeline does not perform health checks after deployment.
* Issue: Possible DDOS/other attacks- explore how to monitor/ prevent ?
* Issue: Prject is not licensed. Should license be added ? If yes, Explore licensing options , compare and decide.
* Scalability roadmap: currently deployment is set to a single replica. explore future scaling up options
* Continuous Integration missing: Unit tests are not being executed in the pipeline.