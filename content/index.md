---
title: Game Code Mastery Wikis
---
Hello everyone and welcome to the new place for Game Code Mastery wikis and documentation!

You might be wondering why this is going to be the new home for Documentation for my projects. Below, I will explain in a bit more detail why I’m making this change and how it enhances my documentation:

# Switching Unreal Documentation to Quartz and Markdown
I’m transitioning my Unreal Engine documentation from Wikiful to Quartz, a static-site generator, paired with a Markdown editor. This change streamlines workflows, enhances navigation, and supports scalable, high-quality documentation that evolves with my projects. 

## Why Move from Wikiful?
 I enjoyed using Wikiful as it is simple and user-friendly, but it is missing some key features I need:

1. **Lack of Markdown Support**: I'm experienced with the markdown syntax and prefer it's workflow for writing documentation.
2. **Lack of Advanced Tools**: Wikiful Lacks advanced tools like code highlighting and has limited headings.
 3. **Customization Constraints**: Wikiful Offers minimal customization and design flexibility and doesn't offer a dark mode. 
4. **Wikiful issues**: Wikiful works well the vast majority of the time and is a great service, but I have experienced corrupted pages and corrupted account settings with Wikiful.

As a result I felt a more robust solution would help me create better documentation for Advanced ARPG Combat.

## Why Quartz and Markdown?
Primarily because I frequently use Markdown and have grown to really appreciate the versatility, portability, and simplicity of it. So I wanted a markdown based solution that has what I need:

1. **Markdown based Solution**: Markdown is a simple and easy-to-use markup language you can use to format virtually any document.
	- Words as `Code` 
	- Code blocks with syntax highlighting:
```cpp
/*
* Making a word code is as simple as `` and adding a code block is as simple as ```
* Supports headings: # for heading 1, ## for heading 2, ### for heading 3, etc
* divide pages with ---
* 1, 2, 3, etc for numbered lists and - for unnumbered lists
* and more. This code block is set for C++ syntax highlighting which will be very useful for Unreal Engine related documentation
*/

#include <iostream>

using namespace std;

int main(){

cout << "Hello World! " << endl;
return 0;

}

```


> [!NOTE] NOTE:
>  You can find out more about markdown HERE if you're curious: https://www.markdownguide.org/

2. **Version Control**: With this new solution I can utilize git version control to more finely tune the different versions of the documentation so that I can apply and revert changes as needed.
3. **Dark Mode:** Funnily enough having a dark mode is a huge deal for me as everything I use dark mode for everything and when working at night I don't like being blinded by a bright white screen. So having dark mode makes writing or reading documentation at night less straining.
4. **Portability:** I can write the documentation in my note taking app of choice, Obsidian, and use those same markdown files to publish in my official documentation.
5. **Nicer Layout**: In addition to dark mode, I also prefer the nicer layout along with features like an automatic Table of Contents that is on the right side of every document. 
6. **Obsidian Integration**: I use Obsidian as my primary note taking application, Quartz allows me to easily integrate with Obsidian.
7. **Customization**: With Quartz I can fully customize this site by installing custom plugins and extensions. So if I want to add a specific feature that isn't available on Wikiful I can do so provided I can make it in HTML and CSS. 

When I discovered Quartz and realized how using Quartz together with Markdown improved my workflow and documentation quality I knew this change was the right decision. I hope you all are looking forward to the new direction for my content and the documentation!



