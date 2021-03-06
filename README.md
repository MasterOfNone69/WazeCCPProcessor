# Waze WARP 

**A free, open source cloud data processor for mobility use cases.**

WARP *(Waze Analytics Relational-database Platform)* takes the [Waze CCP](https://www.waze.com/ccp) data feed and processes it into a cloud database system for historic and real-time querying, analysis, API hooks, mapping, and integrations.

## Overview

Louisville has created an automated cloud processing solution that can be replicated by any CCP Partner in the cloud, with the [help of other govs, partners, and sponsors](https://github.com/LouisvilleMetro/WazeCCPProcessor/wiki/Waze-CCP-Collaborative-Processor).

You grab this project's [Terraform.io](http://www.terraform.io) code and deploy the infrastructure-as-code stack (currently AWS but cloud agnostic).

You enter your CCP data feed URL as a parameter.

Then you can store, analyze, query, extract live and historic data for your city for many [use cases](https://github.com/LouisvilleMetro/WazeCCPProcessor/wiki/Use-Cases).

See the [Projects](https://github.com/LouisvilleMetro/WazeCCPProcessor/projects) area for how you can help, and the [Wiki](https://github.com/LouisvilleMetro/WazeCCPProcessor/wiki) for all the details.

## Premier Project Sponsors

Organizations that are helping to fund, manage, collaborate, promote, and support the project.

![Sponsors](https://raw.githubusercontent.com/LouisvilleMetro/WazeCCPProcessor/master/docs/images/sponsors.jpg)

See the project [wiki](https://github.com/LouisvilleMetro/WazeCCPProcessor/wiki) for more details.

## Deploy the Solution to Your Cloud

We have an end-to-end data processor, database, and analytics tools working that you can deploy.  It saves your CCP data as JSON files every 2 minutes, and processes the data into a combined real-time and historic database.

**See [/docs/technical-deployment.md](/docs/technical-deployment.md) for very detailed instructions** on how to get up and running in [30 minutes](https://twitter.com/brendanbabb/status/994314335634604032).

## Finished Result

This creates an infrastructure stack which pings your custom Waze CCP data feed every 2 minutes and saves the JSON to a new bucket, which then gets processed into the relational database.  There is error handling and also notification options for when things go right or wrong.  

Here's what is created:

![Waze Current Architecture](docs/Current%20Architecture.png "Waze Current Architecture")

You can update the stack with new infrastructure as the code here gets updated, and it only affects new and changed items. You can also remove all the infrastructure automatically (minus the S3 bucket you created manually) by deleting the Terraform stack using `terraform destroy` after the `get` and `init` commands. 

## Building on the Platform

Since this is managed like software product, tools and integrations can be built upon it, and used by anyone who has deployed it.  Examples include:

- [Power BI Traffic Study Tool](https://medium.com/louisville-metro-opi2/how-we-do-free-traffic-studies-with-waze-data-and-how-you-can-too-a550b0728f65)
- [CARTO Connector](https://carto.com/blog/announcing-carto-waze-open-source-connector/)

Create your own integrations and see our [Issues](https://github.com/LouisvilleMetro/WazeCCPProcessor/issues) for ideas.

## Loading Historic JSON Data Files

You can also dump any previously collected historic JSON files into your bucket and the processor will go through them and save/update the relevant data into your database.  Using `aws s3 cp` is a good place to start to copy files in chunks from a previous bucket to a new bucket.  

**See [/docs/technical-backloading-data.md](/docs/technical-backloading-data.md) for very detailed instructions!**

## Costs

This config stands up infrastructure that is pretty inexpensive (and is about the same for any sized city). The database itself is the main cost (95+%) and will result in monthly charges under $200.  We are working on ways to reduce the costs and you can help out on this [issue](https://github.com/LouisvilleMetro/WazeCCPProcessor/issues/32).

## Current Plans

We are working on writing API hooks, data visualizations and tools, and maps, which is all part of our project roadmap.

See our [Projects](https://github.com/LouisvilleMetro/WazeCCPProcessor/projects) and [Releases](https://github.com/LouisvilleMetro/WazeCCPProcessor/releases) areas for our blueprint of how we are proceeding. 

**We would like to collaborate with you!**  Please suggest updates, work on the [help wanted issues](https://github.com/LouisvilleMetro/WazeCCPProcessor/issues?q=is%3Aissue+is%3Aopen+label%3A%22help+wanted%22), collaborate on the Wiki, etc.  It would be great to work together to get the best solution, use cases, and finish faster.   

We've build out the code in [Terraform](http://www.terraform.io) and supported AWS at first, but would like it to be deployed to any cloud provider.  See our [Issues](https://github.com/LouisvilleMetro/WazeCCPProcessor/issues) area for how you can help with this.

## Background

If you'd like a little more background on Louisville and what our city has been going with Waze and other mobility data, take a look at these links:

1. [Louisville Waze Internal Hackathon Recap](https://medium.com/louisville-metro-opi2/waze-louisvilles-first-internal-hackathon-647363a85392)
2. [Harvard Civic Analytics Network Presentation - Slides](https://docs.google.com/presentation/d/1esPVvhuIRjD199rN8aimK_XcmCt0pJOkjEIyCMhGKks/)
3. [Waze April 2018 Monthly Call - Slides](https://docs.google.com/presentation/d/1loAV4BDAUyXdrn44QoLmYiwZdLmL59C4jvJGlZ1a-AY/)
4. [Open Government Coalition](https://www.govintheopen.com/) Supporting Framework
5. [Run Free Traffic Studies Using This Tool](https://medium.com/louisville-metro-opi2/how-we-do-free-traffic-studies-with-waze-data-and-how-you-can-too-a550b0728f65)
6. [Traffic Study Tool Version 2](https://medium.com/louisville-metro-opi2/data-driven-governance-reflecting-on-opi2-bdd324aefbdc) with Intersection Analysis
7. [UPenn Masters in Urban Spatial Analytics Program](https://insiderlouisville.com/government/infrastructure/a-new-data-project-aims-to-predict-louisville-traffic-collisions/) Collision Prediction Model


