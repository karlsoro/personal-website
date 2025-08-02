import MainLayout from '@/components/layout/MainLayout'
import MarkdownRenderer from '@/components/shared/MarkdownRenderer'

const aiStatementContent = `# Statement on Use of AI

At www.sorochinski.com, I—Karl Sorochinski—use Artificial Intelligence (AI) tools to support the creation and refinement of content published on this site. These tools are leveraged to assist with:

- Research and knowledge discovery
- Drafting and editing blog posts, white papers, case studies, and technical articles
- Enhancing structure, grammar, and readability
- Identifying and formatting relevant references and sources

AI is used as an augmentation tool—not a substitute for my expertise, point of view, or judgment. Every piece of content is reviewed by me personally to ensure it reflects my intended message, aligns with my perspective, and maintains factual accuracy to the best of my ability.

## Editorial Integrity

The final responsibility for all published material rests with me. Where AI is used, it supports the efficiency and clarity of my writing but does not override my authorship or accountability. I strive to ensure that all published materials are clear, correct, and purposeful.

## Disclaimer

While AI tools are employed thoughtfully and all content is human-reviewed, I cannot guarantee that every page is free from errors, outdated information, or interpretation differences. The content on this site is provided for informational and educational purposes only and should not be construed as professional, legal, or financial advice.

By using this site, you acknowledge that AI assistance may be involved in content creation and accept that such technology is used to enhance—not replace—human insight and editorial control.

If you have questions, suggestions, or concerns about any content on this site, please feel free to contact me at karl@sorochinski.com.`

export default function AIStatementPage() {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="prose prose-lg max-w-none">
          <MarkdownRenderer content={aiStatementContent} />
        </div>
      </div>
    </MainLayout>
  )
} 