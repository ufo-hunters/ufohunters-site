# frozen_string_literal: true

Rails.logger.debug 'Seeding database...'

# Create demo user
user = User.find_or_create_by(username: 'demo') do |u|
  u.password = 'demo123'
  u.email = 'demo@ufo-hunters.com'
end
Rails.logger.debug { "  User: #{user.username}" }

# Create sample reports
sample_sightings = [
  { location: 'Phoenix, Arizona', shape: 'Triangle', duration: '2 hours',
    description: 'Large V-shaped formation of lights moving slowly across the sky.',
    coord: [-112.074, 33.4484], sighted_at: '20240315', reported_at: '20240316',
    source: 'ufo-hunters.com', status: 1, case_number: 10_001 },
  { location: 'Rendlesham Forest, UK', shape: 'Disk', duration: '45 min.',
    description: 'Bright metallic disk hovering above the treeline with pulsating lights.',
    coord: [1.4347, 52.0833], sighted_at: '20240220', reported_at: '20240221',
    source: 'ufo-hunters.com', status: 1, case_number: 10_002 },
  { location: 'Roswell, New Mexico', shape: 'Oval', duration: '10 min.',
    description: 'Bright oval object descending rapidly before vanishing.',
    coord: [-104.523, 33.3943], sighted_at: '20240110', reported_at: '20240111',
    source: 'ufo-hunters.com', status: 1, case_number: 10_003 },
  { location: 'Mexico City, Mexico', shape: 'Sphere', duration: '30 min.',
    description: 'Multiple luminous spheres hovering in formation over the city.',
    coord: [-99.1332, 19.4326], sighted_at: '20240405', reported_at: '20240406',
    source: 'ufo-hunters.com', status: 1, case_number: 10_004 },
  { location: 'Tokyo, Japan', shape: 'Cigar', duration: '5 min.',
    description: 'Elongated bright object moving silently at high speed.',
    coord: [139.6917, 35.6895], sighted_at: '20240501', reported_at: '20240502',
    source: 'ufo-hunters.com', status: 1, case_number: 10_005 }
]

sample_sightings.each do |attrs|
  report = Report.find_or_create_by(case_number: attrs[:case_number]) do |r|
    attrs.each { |k, v| r.send(:"#{k}=", v) }
  end
  Rails.logger.debug { "  Report: #{report.location} (#{report.case_number})" }
end

# Create sample article
Article.find_or_create_by(title: 'Welcome to UFO Hunters') do |a|
  a.user_id = user.id
  a.published_date = '20240101'
  a.teaser = 'Welcome to the UFO Hunters community. Our mission is to collect and share UFO sighting data.'
  a.body = '<p>UFO Hunters is a collaborative platform dedicated to documenting UFO sightings worldwide.</p>'
  a.status = 1
end
Rails.logger.debug '  Article: Welcome to UFO Hunters'

# Create sample country
Countries.find_or_create_by(cod: 'ESP') do |c|
  c.name = 'Spain'
  c.continent = 'Europe'
  c.center = [-4, 40]
  c.zoom = '6'
  c.geometry = {
    type: 'Polygon',
    coordinates: [[[-9.03, 41.88], [-7.97, 43.74], [-1.50, 43.03],
                   [3.03, 41.89], [0.81, 41.01], [-0.27, 39.30],
                   [-5.37, 35.94], [-7.45, 37.09], [-9.03, 41.88]]]
  }
end
Rails.logger.debug '  Country: Spain'

Rails.logger.debug { "Done! #{Report.count} reports, #{User.count} users, #{Article.count} articles." }
