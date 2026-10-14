import groq from 'groq';

export const siteSettingsQuery = groq`*[_type == "siteSettings"][0]{
  name, role, heroTitle, heroAccentWord, heroSubtitle, aboutLead,
  highlights, skills, email, socialLinks, footerNote
}`;

export const projectsQuery = groq`*[_type == "project"] | order(order asc, _createdAt desc){
  _id, title, "slug": slug.current, category, summary, coverImage,
  client, company, year, role, tools, resultLabel, resultValue
}`;

export const projectBySlugQuery = groq`*[_type == "project" && slug.current == $slug][0]{
  _id, title, "slug": slug.current, category, summary, coverImage, gallery,
  client, company, year, role, tools, description, resultLabel, resultValue
}`;

export const projectSlugsQuery = groq`*[_type == "project"]{ "slug": slug.current }`;

export const servicesQuery = groq`*[_type == "service"] | order(order asc){
  _id, title, description, icon
}`;

export const testimonialsQuery = groq`*[_type == "testimonial"] | order(order asc){
  _id, quote, name, role, avatar
}`;
