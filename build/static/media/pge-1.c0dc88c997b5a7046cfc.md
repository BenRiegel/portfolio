# PGE Project, Part 1

![PGE Website](/images/pge.png)

This is part one of a three part series on the People's Guide to Energy Project, which was my first (paid) coding work after completing my front-end bootcamp. I began developing the People's Guide to Energy website in early 2018, and I worked part-time for approximately six months. Since then, I have periodically maintained the website, mostly by adding new student projects. Readers can view the People's Guide to Energy at its [website](https://pgeproject.netlify.app/). The source code can be found on [my GitHub site](https://github.com/BenRiegel/pge-v2).

## Overview

The People's Guide to Energy Project (PGE Project) is a student-learning project created by Dr. Autumn Thoyre, a professor at San Francisco State University. The goal of the project is for students to research locations where disadvantaged groups of people have been harmed unjustly by activities related to energy production or consumption (e.g. the construction of a power plant that pollutes a low-income neighborhood). Student projects are posted on a website for viewing by the general public.

The PGE Project was first developed in 2014 while Dr. Thoyre was working at Colgate University in New York State. The original website was a WordPress site that featured an interactive web map that displayed the locations of student research sites as point graphics. Users could click on a site, and a popup window would open that would display a brief summary of the student project as well as a link to the WordPress page featuring the full write-up. The original website also allowed students to log in and publish their projects using WordPress tools.

## Problem

WordPress websites typically are not very interactive due to the fact that they do not allow developers to include custom JavaScript code. The original PGE website required a plug-in for the interactive web map. According to WordPress' terms of service, plug-ins are not permitted under the basic, free plan. In order to have plug-ins, one must upgrade to a plan that costs $25 per month. While Dr. Thoyre was at Colgate University, this fee was paid by the university; however, when she moved to San Francisco State University, this was no longer possible and she would have had to pay the fee out of pocket. While Dr. Thoyre wanted to maintain the interactive map and the ease with which students can publish material on the WordPress site, she did not want to pay the rather expensive fee. I was recruited to help find a solution to this problem. An adequate website would have three components. It would:

1) Feature a similar interactive web map,  
2) Allow students to input their projects, but
3) Not require paying a monthly fee

## Solution

I considered several possible solutions to this problem. First, I thought about creating a full-service website that would both feature the web map and also have a component that would allow students to log in and publish projects. I decided against this course of action because the scope of the project was too large, in particular the backend component. The alternative was to maintain the current WordPress site but mainly for students to create and publish their projects. I would then develop a second website that would be viewed by the public. It would feature the interactive map and allow users to access the student project information. When a user clicks on a site in the web map, a popup window would open displaying the summary of the project. There would then be a "Read More" link which, when clicked, would open up a new browser tab displaying a WordPress page with the full project text. This solution would satisfy all of the criteria listed above and would also be technically feasible.

In my [next blog post](pge-2), I will discuss the implementation of the PGE site.
